declare module 'react-google-recaptcha-v2' {
    import { Component } from 'react';
  
    export interface ReCAPTCHAProps {
      sitekey: string;
      onChange?: (token: string | null) => void;
      theme?: 'light' | 'dark';
      size?: 'normal' | 'compact';
    }
  
    export default class ReCAPTCHA extends Component<ReCAPTCHAProps> {}
  }