export const notification = {
    success(message) {
      this._show(message, 'success');
    },
    warning(message) {
      this._show(message, 'warning');
    },
    _show(message, type) {
      const container = document.getElementById('notification-container');

      if (container.children.length >= 10) {
        container.children[0].remove(); 
      }
  
      const wrapper = document.createElement('div');
      wrapper.className = `
        max-w-sm w-full p-4 rounded-lg shadow-lg text-white  mb-4
        flex items-center justify-between gap-2 animate-slide-in
        ${type === 'success' ? 'bg-[#62BB00]' : 'bg-[#DF585B]'}
      `;
      wrapper.innerHTML = `
        <span>${message}</span>
        <button class="text-white font-bold focus:outline-none" onclick="this.parentElement.remove()">&times;</button>
      `;
  
      container.appendChild(wrapper);
  
      setTimeout(() => {
        wrapper.classList.add('animate-fade-out');
        setTimeout(() => wrapper.remove(), 300);
      }, 3000);
    }
};