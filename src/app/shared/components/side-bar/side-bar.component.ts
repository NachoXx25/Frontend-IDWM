import { Component, Renderer2, ElementRef, HostListener } from '@angular/core';
import { AuthService } from './../../../auth/services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: []
})
export class SideBarComponent {
  isSidebarOpen = false; // Barra lateral abierta/cerrada

  constructor(private renderer: Renderer2, private el: ElementRef, private AuthService: AuthService) {}
  /**
   * Cambia el estado de la barra lateral
   */
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    const sidebar = this.el.nativeElement.querySelector('#logo-sidebar');
    if (this.isSidebarOpen) {
      this.renderer.removeClass(sidebar, '-translate-x-full');
      this.renderer.addClass(sidebar, 'translate-x-0');
    } else {
      this.renderer.removeClass(sidebar, 'translate-x-0');
      this.renderer.addClass(sidebar, '-translate-x-full');
    }
  }
  /**
   *  Cierra la barra lateral si se hace clic fuera de ella
   * @param event Evento
   */
  @HostListener('document:click', ['$event'])
  clickout(event: { target: any; }) {
    if (!this.el.nativeElement.contains(event.target) && this.isSidebarOpen) {
      this.toggleSidebar();
    }
  }
  /**
   * Cierra sesión del usuario
   */
  logout() {
    this.AuthService.logout();
  }
}
