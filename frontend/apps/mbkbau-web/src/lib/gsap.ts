import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export { default as gsap } from 'gsap';
export { ScrollTrigger } from 'gsap/ScrollTrigger';
export { SplitText } from 'gsap/SplitText';
