import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

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
      duration: 1.8,
      smoothWheel: true,
      wheelMultiplier: 2.0,
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
      // Centered in hero column with reduced scale and safe clearance from social icons
      laptop.position.set(0.65, -0.36, 0.2);
      laptop.rotation.set(0.65, -1.15, 0.32);
      laptop.scale.set(0.72, 0.72, 0.72);
    }

    // Screen display starts dark when folded, powers on as lid swings open
    // gsap.set('.laptop-screen-display', { opacity: 0 });

    // 2. Idle Floating Animation (starts paused, plays after MacBook opens)
    const floatTween = gsap.to(laptop.position, {
      y: isMobile ? '-=0.06' : '+=0.08',
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

    // Rotate MacBook into Hero isometric position
    introTL.to(
      laptop.rotation,
      {
        x: isMobile ? 0.25 : 0.28,
        y: isMobile ? 0 : -0.42,
        z: isMobile ? 0 : 0.08,
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
      mobileExpTL.to(laptop.position, { y: -5, z: -2, ease: 'none' }, 0);

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
      .fromTo(
        laptop.position,
        { x: 0.65, y: -0.36, z: 0.2 },
        { x: 0, y: -1.14, z: 1.0, ease: 'none', immediateRender: false },
        0
      )
      .fromTo(
        laptop.rotation,
        { x: 0.28, y: -0.42, z: 0.08 },
        { x: 0, y: 0, z: 0, ease: 'none', immediateRender: false },
        0
      )
      .fromTo(
        laptop.scale,
        { x: 0.72, y: 0.72, z: 0.72 },
        { x: 0.94, y: 0.94, z: 0.94, ease: 'none', immediateRender: false },
        0
      );

    if (lid) {
      skillsTL.fromTo(
        lid.rotation,
        { x: -0.32 },
        { x: 0, ease: 'none', immediateRender: false },
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

    // 5. Skills -> Projects: Pin and Horizontal Scroll
    const projectCards = gsap.utils.toArray<HTMLElement>('.project-slide');

    if (projectCards.length > 0) {
      const horizontalContainer = document.getElementById('projects-pin-container');

      if (horizontalContainer) {
        const horizontalTL = gsap.timeline({
          scrollTrigger: {
            trigger: '#projects-pin-container',
            pin: true,
            start: 'top top',
            end: () => `+=${projectCards.length * 550}`,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onEnter: () => setActiveSection('projects'),
            onLeaveBack: () => setActiveSection('skills'),
            onUpdate: (self) => {
              const currentIdx = Math.min(
                Math.floor(self.progress * projectCards.length),
                projectCards.length - 1
              );
              setActiveProject(currentIdx);
            },
          },
        });

        // Dock laptop smoothly to the left side
        horizontalTL
          .to(
            laptop.position,
            { x: -2.3, y: -0.1, z: 0.75, ease: 'none' },
            0
          )
          .to(
            laptop.rotation,
            { x: 0.15, y: 0.38, z: 0, ease: 'none' },
            0
          )
          .to(
            laptop.scale,
            { x: 0.95, y: 0.95, z: 0.95, ease: 'none' },
            0
          );

        if (lid) {
          horizontalTL.to(lid.rotation, { x: -0.32, ease: 'none' }, 0);
        }

        // Slide project cards right-to-left
        horizontalTL.to(
          projectCards,
          {
            xPercent: -100 * (projectCards.length - 1),
            ease: 'none',
          },
          0
        );
      }
    }

    // 6. Projects -> Experience & Education
    const expTL = gsap.timeline({
      scrollTrigger: {
        trigger: '#experience',
        start: 'top bottom',
        end: 'top 30%',
        scrub: true,
        onEnter: () => setActiveSection('experience'),
        onLeaveBack: () => setActiveSection('projects'),
      },
    });

    expTL
      .to(laptop.position, { x: -2.3, y: -4.5, z: -1.5, ease: 'none' }, 0)
      .to(laptop.rotation, { x: 0.5, y: 0.2, z: 0, ease: 'none' }, 0);

    // 7. Experience -> Contact
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
