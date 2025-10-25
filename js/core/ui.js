export class UI {
    static init() {
      this.setupTabs();
      this.hideLoader();
    }
  
    static setupTabs() {
      document.querySelectorAll("[data-tab]").forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();
          const tab = btn.getAttribute("data-tab");
          UI.switchTab(tab);
        });
      });
    }
  
    static switchTab(tabId) {
      document.querySelectorAll(".tab-pane").forEach(t => t.classList.remove("show", "active"));
      const target = document.getElementById(tabId);
      if (target) target.classList.add("show", "active", "fade-in");
    }
  
    static hideLoader() {
      setTimeout(() => document.getElementById("loadingScreen")?.classList.add("hidden"), 500);
    }
  }
  