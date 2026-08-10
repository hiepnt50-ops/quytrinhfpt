export interface TaiLieu {
  ten: string;
  link: string;
  embedLink?: string;
}

export interface QuyTrinhItem {
  tt: string;
  mang: string;
  phuTrach: string;
  quyTrinh: string;
  trangThai?: string;
  sanPham?: string;
  boPhan?: string;
  noiDung?: string;
  taiLieu?: TaiLieu[];
  tomTat?: string;
  loaiDeXuat?: string;
  linhVucDeXuat?: string;
}

export interface GoogleUser {
  idToken: string;
  email: string;
  name?: string;
  picture?: string;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              theme?: 'outline' | 'filled_blue' | 'filled_black';
              size?: 'large' | 'medium' | 'small';
              type?: 'standard' | 'icon';
              text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
              shape?: 'rectangular' | 'pill' | 'circle' | 'square';
              logo_alignment?: 'left' | 'center';
              width?: number;
              locale?: string;
            }
          ) => void;
          prompt: (notification?: (notification: unknown) => void) => void;
          disableAutoSelect: () => void;
          revoke?: (hint: string, done: () => void) => void;
        };
      };
    };
  }
}

