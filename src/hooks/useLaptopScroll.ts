import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { featuredProjects } from '../utils/resumeData';

gsap.registerPlugin(ScrollTrigger);

export type SectionType = 'hero' | 'skills' | 'projects' | 'experience' | 'contact';

export function useLaptopScroll(
  laptopRef: React.RefObject<any>,
  lidRef: React.RefObject<any>,
  setActiveProject: (index: number) => void,
  setActiveSection: (section: SectionType) => void,
  isReady: boolean = true
) {
  useEffect(() => {
    if (!isReady || !laptopRef.current) return;
    const laptop = laptopRef.current;
    const lid = lidRef.current;

    // Reset scroll restoration so refreshing always starts cleanly at the top
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Initialize Lenis for smooth momentum-damped trackpad scrolling (Shared GSAP clock)
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1.25,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const isMobile = window.innerWidth < 768;

    // 1. Initial State: MacBook starts CLOSED showing the top lid and Apple logo
    if (lid) {
      lid.rotation.x = 1.54; // Closed flat against base (positive angle folds lid over keyboard)
    }

    if (isMobile) {
      laptop.position.set(0, -0.6, 0.4);
      laptop.rotation.set(0.55, -0.85, 0.2);
      laptop.scale.set(0.62, 0.62, 0.62);
    } else {
      // Centered in hero right column with ample gap from text (>80px) and proper vertical alignment
      laptop.position.set(0.95, 0.22, 1.28);
      laptop.rotation.set(0.55, -1.05, 0.28);
      laptop.scale.set(0.72, 0.72, 0.72);
    }

    // Screen display starts dark when folded, powers on as lid swings open
    // gsap.set('.laptop-screen-display', { opacity: 0 });

    // 2. Idle Floating Animation (starts paused, plays after MacBook opens)
    const floatTween = gsap.to(laptop.position, {
      y: isMobile ? '-=0.06' : '+=0.06',
      duration: 2.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      paused: true,
    });

    // 3. Opening Entrance Sequence: Rotate whole laptop into view and smoothly swing lid open!
    const introTL = gsap.timeline({
      delay: 0.25,
      onComplete: () => {
        floatTween.play();
      },
    });

    // Animate MacBook into Hero isometric position
    introTL.to(
      laptop.position,
      {
        x: isMobile ? 0 : 0.95,
        y: isMobile ? -0.6 : -0.22,
        z: isMobile ? 0.4 : 0.28,
        duration: 1.8,
        ease: 'power2.out',
      },
      0
    );

    // Rotate MacBook into Hero isometric position
    introTL.to(
      laptop.rotation,
      {
        x: isMobile ? 0.25 : 0.24,
        y: isMobile ? 0 : -0.38,
        z: isMobile ? 0 : 0.05,
        duration: 1.8,
        ease: 'power2.out',
      },
      0
    );

    // Smoothly unlatch and swing lid open to reveal glowing screen with moving code
    if (lid) {
      introTL.to(
        lid.rotation,
        {
          x: -0.32, // Natural ~108° open viewing angle
          duration: 1.7,
          ease: 'power3.out',
        },
        0.35
      );

      // Power on screen display / moving code as lid lifts open
      // introTL.to(
      //   '.laptop-screen-display',
      //   {
      //     opacity: 1,
      //     duration: 0.7,
      //     ease: 'power2.in',
      //   },
      //   0.8
      // );
    }

    const handleInitialScroll = () => {
      if (introTL.isActive()) {
        introTL.progress(1);
        // gsap.set('.laptop-screen-display', { opacity: 1 });
      }
    };
    window.addEventListener('scroll', handleInitialScroll, { once: true, passive: true });

    // ---------------- MOBILE RESPONSIVE SCROLL ----------------
    if (isMobile) {
      const mobileSkillsTL = gsap.timeline({
        scrollTrigger: {
          trigger: '#skills',
          start: 'top 80%',
          end: 'top top',
          scrub: true,
          onEnter: () => {
            setActiveSection('skills');
            floatTween.pause();
          },
          onLeaveBack: () => {
            setActiveSection('hero');
            floatTween.play();
          },
        },
      });
      mobileSkillsTL
        .fromTo(
          laptop.position,
          { x: 0, y: -0.6, z: 0.4 },
          { x: 0, y: -0.85, z: 0.6, ease: 'none', immediateRender: false },
          0
        )
        .fromTo(
          laptop.rotation,
          { x: 0.25, y: 0, z: 0 },
          { x: 0, y: 0, z: 0, ease: 'none', immediateRender: false },
          0
        )
        .fromTo(
          laptop.scale,
          { x: 0.62, y: 0.62, z: 0.62 },
          { x: 0.78, y: 0.78, z: 0.78, ease: 'none', immediateRender: false },
          0
        );

      if (lid) {
        mobileSkillsTL.fromTo(
          lid.rotation,
          { x: -0.32 },
          { x: 0, ease: 'none', immediateRender: false },
          0
        );
      }
      mobileSkillsTL.to('#skills-header-container', { opacity: 0, y: -20, ease: 'none' }, 0);

      const mobileProjectsTL = gsap.timeline({
        scrollTrigger: {
          trigger: '#projects',
          start: 'top 70%',
          end: 'bottom bottom',
          scrub: true,
          onEnter: () => setActiveSection('projects'),
          onLeaveBack: () => setActiveSection('skills'),
        },
      });
      mobileProjectsTL
        .to(laptop.position, { x: 0, y: 0.6, z: 0.8, ease: 'none' }, 0)
        .to(laptop.rotation, { x: 0.18, y: 0, z: 0, ease: 'none' }, 0)
        .to(laptop.scale, { x: 0.65, y: 0.65, z: 0.65, ease: 'none' }, 0);

      const mobileExpTL = gsap.timeline({
        scrollTrigger: {
          trigger: '#experience',
          start: 'top 80%',
          end: 'top 30%',
          scrub: true,
          onEnter: () => setActiveSection('experience'),
          onLeaveBack: () => setActiveSection('projects'),
        },
      });
      mobileExpTL.to(laptop.position, { x: 0, y: 0.5, z: 0.7, ease: 'none' }, 0);

      ScrollTrigger.create({
        trigger: '#contact',
        start: 'top 70%',
        onEnter: () => setActiveSection('contact'),
        onLeaveBack: () => setActiveSection('experience'),
      });

      return () => {
        window.removeEventListener('scroll', handleInitialScroll);
        introTL.kill();
        floatTween.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }

    // ---------------- DESKTOP CHOREOGRAPHY ----------------

    // Hero Stage Dwell Buffer: Pinned so trackpad momentum doesn't immediately skip Hero
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: '+=50%',
      pin: true,
      anticipatePin: 1,
      onLeave: () => floatTween.pause(),
      onEnterBack: () => floatTween.play(),
    });

    // 4. Hero -> Skills: Zoom Camera into Screen (Screen centered, upright, keyboard flat)
    const skillsTL = gsap.timeline({
      scrollTrigger: {
        trigger: '#skills',
        start: 'top bottom',
        end: 'top top',
        scrub: true,
        onEnter: () => {
          setActiveSection('skills');
          floatTween.pause();
        },
        onLeaveBack: () => {
          setActiveSection('hero');
          floatTween.play();
        },
      },
    });

    skillsTL
      .to(
        laptop.position,
        { x: 1.0, y: -1.14, z: 1.45, ease: 'none', immediateRender: false },
        0
      )
      .to(
        laptop.rotation,
        { x: 0.20, y: -0.32, z: 0.04, ease: 'none', immediateRender: false },
        0
      )
      .to(
        laptop.scale,
        { x: 0.88, y: 0.88, z: 0.88, ease: 'none', immediateRender: false },
        0
      );

    if (lid) {
      skillsTL.fromTo(
        lid.rotation,
        { x: -0.32 },
        { x: -0.25, ease: 'none', immediateRender: false },
        0
      );
    }

    // Pin #skills for an extensive dwell plateau so user can comfortably inspect bubbles without drift
    ScrollTrigger.create({
      trigger: '#skills',
      start: 'top top',
      end: '+=70%',
      pin: true,
      anticipatePin: 1,
    });

    // 5. Skills -> Projects Entrance: Smoothly glide laptop from Right to Left Docked position (Centered in left 50%)
    const projectsEnterTL = gsap.timeline({
      scrollTrigger: {
        trigger: '#projects',
        start: 'top bottom',
        end: 'top top',
        scrub: true,
      },
    });

    projectsEnterTL
      .to(
        laptop.position,
        { x: -0.88, y: -1.0, z: 1.52, ease: 'none', immediateRender: false },
        0
      )
      .to(
        laptop.rotation,
        { x: 0.16, y: 0.28, z: -0.02, ease: 'none', immediateRender: false },
        0
      )
      .to(
        laptop.scale,
        { x: 0.86, y: 0.86, z: 0.86, ease: 'none', immediateRender: false },
        0
      );

    if (lid) {
      projectsEnterTL.fromTo(
        lid.rotation,
        { x: -0.25 },
        { x: -0.25, ease: 'none', immediateRender: false },
        0
      );
    }

    // Pinned Projects Section: Virtual scroll distance to smoothly cycle through projects in-place
    const totalProjects = featuredProjects.length;
    ScrollTrigger.create({
      id: 'projects-pin',
      trigger: '#projects-pin-container',
      pin: true,
      start: 'top top',
      end: () => `+=${totalProjects * 1000}`,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter: () => setActiveSection('projects'),
      onLeaveBack: () => setActiveSection('skills'),
      onUpdate: (self) => {
        const currentIdx = Math.min(
          Math.floor(self.progress * totalProjects),
          totalProjects - 1
        );
        setActiveProject(currentIdx);
      },
    });

    // 6. Projects -> Experience & Education (Glide laptop from Left to Right Docked position)
    const expTL = gsap.timeline({
      scrollTrigger: {
        trigger: '#experience',
        start: 'top bottom',
        end: 'top 20%',
        scrub: true,
        onEnter: () => setActiveSection('experience'),
        onLeaveBack: () => setActiveSection('projects'),
      },
    });

    expTL
      .to(
        laptop.position,
        { x: 0.95, y: -0.15, z: 0.45, ease: 'none', immediateRender: false },
        0
      )
      .to(
        laptop.rotation,
        { x: 0.18, y: -0.32, z: 0.04, ease: 'none', immediateRender: false },
        0
      )
      .to(
        laptop.scale,
        { x: 0.82, y: 0.82, z: 0.82, ease: 'none', immediateRender: false },
        0
      );

    // 7. Experience -> Contact & Certifications (Laptop stays active and docked)
    const contactTrigger = ScrollTrigger.create({
      trigger: '#contact',
      start: 'top 70%',
      onEnter: () => setActiveSection('contact'),
      onLeaveBack: () => setActiveSection('experience'),
    });

    return () => {
      window.removeEventListener('scroll', handleInitialScroll);
      introTL.kill();
      floatTween.kill();
      contactTrigger.kill();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [laptopRef, lidRef, setActiveProject, setActiveSection, isReady]);
}
