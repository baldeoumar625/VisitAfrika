/**
 * PROJET: VISIT AFRIKA
 * FICHIER: admin_messages.js
 * DESCRIPTION: Script d'administration pour la gestion des messages de contact.
 */

const getApiUrl = (path) => (window.location.port === '5502' || window.location.port === '5500') 
    ? `http://127.0.0.1:8000${path}` 
    : path;

let allMessages = [];

document.addEventListener('DOMContentLoaded', () => {
    loadContactMessages();

    const searchInput = document.getElementById('searchMessageInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = allMessages.filter(m => 
                (m.name || '').toLowerCase().includes(query) ||
                (m.email || '').toLowerCase().includes(query) ||
                (m.subject || '').toLowerCase().includes(query) ||
                (m.message || '').toLowerCase().includes(query)
            );
            renderMessages(filtered);
        });
    }
});

async function loadContactMessages() {
    const tbody = document.getElementById('messagesTableBody');
    if (!tbody) return;

    try {
        const token = localStorage.getItem('access_token');
        const res = await fetch(getApiUrl('/api/contact_messages'), {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) throw new Error('Erreur réseau');

        allMessages = await res.json();
        renderMessages(allMessages);
    } catch (err) {
        console.error('Erreur chargement messages:', err);
        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-danger">Impossible de charger les messages.</td></tr>';
    }
}

function renderMessages(messages) {
    const tbody = document.getElementById('messagesTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    if (messages.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">Aucun message trouvé.</td></tr>';
        return;
    }

    messages.forEach(msg => {
        const dateStr = msg.created_at ? new Date(msg.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A';
        const isRead = msg.is_read === 1;

        const tr = document.createElement('tr');
        if (!isRead) tr.classList.add('fw-bold');

        tr.innerHTML = `
            <td>${escapeHtml(msg.name || 'Anonyme')}</td>
            <td><a href="mailto:${escapeHtml(msg.email)}">${escapeHtml(msg.email)}</a></td>
            <td>${escapeHtml(msg.subject || 'Sans sujet')}</td>
            <td><small class="text-muted">${dateStr}</small></td>
            <td>
                <span class="badge ${isRead ? 'bg-secondary' : 'bg-success'}">
                    ${isRead ? 'Lu' : 'Nouveau'}
                </span>
            </td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-primary me-1" onclick="viewMessage(${msg.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteMessage(${msg.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.viewMessage = async function(id) {
    const msg = allMessages.find(m => m.id === id);
    if (!msg) return;

    document.getElementById('msgModalSender').textContent = msg.name || 'Anonyme';
    document.getElementById('msgModalEmail').textContent = msg.email || 'Non renseigné';
    document.getElementById('msgModalSubject').textContent = msg.subject || 'Détail du message';
    document.getElementById('msgModalDate').textContent = msg.created_at ? new Date(msg.created_at).toLocaleString('fr-FR') : '';
    document.getElementById('msgModalContent').textContent = msg.message || '';

    // Mark as read
    if (msg.is_read !== 1) {
        try {
            const token = localStorage.getItem('access_token');
            await fetch(getApiUrl(`/api/contact_messages/${id}`), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ is_read: 1 })
            });
            msg.is_read = 1;
            renderMessages(allMessages);
        } catch(e) { console.error(e); }
    }

    const modalEl = document.getElementById('viewMessageModal');
    if (modalEl) {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
    }
};

window.deleteMessage = async function(id) {
    if (!confirm('Voulez-vous vraiment supprimer ce message ?')) return;

    try {
        const token = localStorage.getItem('access_token');
        const res = await fetch(getApiUrl(`/api/contact_messages/${id}`), {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.ok) {
            allMessages = allMessages.filter(m => m.id !== id);
            renderMessages(allMessages);
        } else {
            alert('Erreur lors de la suppression.');
        }
    } catch(err) {
        console.error(err);
        alert('Erreur réseau lors de la suppression.');
    }
};

function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/[&<>"']/g, function(m) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
}
