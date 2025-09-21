import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './TweestHero.css'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

const TweestHero = () => {
  const containerRef = useRef(null)
  const overlayRef = useRef(null)
  const heroMainContainerRef = useRef(null)
  const heroMainImageRef = useRef(null)
  const heroMainLogoRef = useRef(null)
  const heroTextLogoRef = useRef(null)
  const heroTextRef = useRef(null)
  const hero2ContainerRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const overlay = overlayRef.current
    const heroMainContainer = heroMainContainerRef.current
    const heroMainImage = heroMainImageRef.current
    const heroMainLogo = heroMainLogoRef.current
    const heroTextLogo = heroTextLogoRef.current
    const heroText = heroTextRef.current
    const hero2Container = hero2ContainerRef.current
    const scrollIndicator = scrollIndicatorRef.current

    if (!container || !overlay || !heroMainContainer || !heroMainImage || !heroMainLogo || !heroTextLogo || !heroText || !hero2Container || !scrollIndicator) return

    // First step - initial animations
    gsap.from(heroMainContainer, {
      scale: 1.45,
      duration: 2.8,
      ease: "power3.out",
    })

    gsap.to(overlay, {
      opacity: 0,
      duration: 2.8,
      ease: "power3.out",
      onComplete: () => {
        document.body.style.overflow = "visible"
        document.body.style.overflowX = "hidden"
      },
    })

    // Scroll Indicator bounce animation
    const bounceTimeline = gsap.timeline({
      repeat: -1,
      yoyo: true,
    })

    bounceTimeline.to(scrollIndicator, {
      y: 20,
      opacity: 0.6,
      duration: 0.8,
      ease: "power1.inOut",
    })

    // Create main scroll timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        scrub: 1,
        pin: true,
        anticipatePin: 1, // helps avoid jump during pinning
        start: "top top",
        end: "+=1600",
        ease: "none",
      },
    })

    // Set initial scale and hide logo initially
    tl.set(heroMainContainer, {
      scale: 1.25,
    })
    
    tl.set(heroMainLogo, {
      opacity: 0,
    })
    
    // Set text to be initially hidden
    tl.set(heroText, {
      opacity: 0,
    })

    // Scale down animation
    tl.to(heroMainContainer, {
      scale: 1,
      duration: 1,
    })

    // Logo fade in on scroll (starts hidden, becomes visible)
    tl.fromTo(heroMainLogo, {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 0.8,
    }, "<+=0.2")

    // Logo fade out completely before text appears
    tl.to(heroMainLogo, {
      opacity: 0,
      duration: 0.5,
    }, "<+=1.0")

    // Main image fade out
    tl.to(heroMainImage, {
      opacity: 0,
      duration: 0.9,
    }, "<+=0.5")

    // Background size change
    tl.to(heroMainContainer, {
      backgroundSize: "28vh",
      duration: 1.5,
    }, "<+=0.2")

    // Hero text appears (opacity) after logo is completely gone
    tl.to(heroText, {
      opacity: 1,
      duration: 0.5,
    }, "<+=2.0")

    // Hero text gradient animation (appears after logo is completely gone)
    tl.fromTo(heroText, {
      backgroundImage: `radial-gradient(
        circle at 50% 200vh,
        rgba(255, 214, 135, 0) 0,
        rgba(157, 47, 106, 0.5) 90vh,
        rgba(157, 47, 106, 0.8) 120vh,
        rgba(32, 31, 66, 0) 150vh
      )`,
    }, {
      backgroundImage: `radial-gradient(circle at 50% 3.9575vh, rgb(255, 213, 133) 0vh,
       rgb(247, 77, 82) 50.011vh,
        rgb(145, 42, 105) 90.0183vh,
         rgba(32, 31, 66, 0) 140.599vh)`,
      duration: 3,
    }, "<")

    // Purple logo animation
    tl.fromTo(heroTextLogo, {
      opacity: 0,
      maskImage: `radial-gradient(circle at 50% 145.835%, rgb(0, 0, 0) 36.11%, rgba(0, 0, 0, 0) 68.055%)`,
    }, {
      opacity: 1,
      maskImage: `radial-gradient(
      circle at 50% 105.594%,
      rgb(0, 0, 0) 62.9372%,
      rgba(0, 0, 0, 0) 81.4686%
    )`,
      duration: 3,
    }, "<0.2")

    // Hide main container
    tl.set(heroMainContainer, { opacity: 0 })

    // Scale down hero 1 container
    tl.to(container.querySelector('.hero-1-container'), { scale: 0.9, duration: 3 }, "<-=3")

    // Apply mask to hero 1 container
    tl.set(container.querySelector('.hero-1-container'), {
      maskImage: `radial-gradient(circle at 50% 16.1137vh, rgb(0, 0, 0) 96.1949vh, rgba(0, 0, 0, 0) 112.065vh)`,
    }, "<+=2.1")

    // Animate mask
    tl.to(container.querySelector('.hero-1-container'), {
      maskImage: `radial-gradient(circle at 50% -40vh, rgb(0, 0, 0) 0vh, rgba(0, 0, 0, 0) 80vh)`,
      duration: 2,
    }, "<+=0.2")

    // Hide text logo
    tl.to(heroTextLogo, {
      opacity: 0,
      duration: 2,
    }, "<1.5")

    // Hide hero 1 container and show hero 2
    tl.set(container.querySelector('.hero-1-container'), { opacity: 0 })
    tl.set(hero2Container, { visibility: "visible" })

    // Show hero 2 container
    tl.to(hero2Container, { opacity: 1, duration: 3 }, "<+=0.2")

    // Hero 2 gradient animation
    tl.fromTo(hero2Container, {
      backgroundImage: `radial-gradient(
        circle at 50% 200vh,
        rgba(255, 214, 135, 0) 0,
        rgba(157, 47, 106, 0.5) 90vh,
        rgba(157, 47, 106, 0.8) 120vh,
        rgba(32, 31, 66, 0) 150vh
      )`,
    }, {
      backgroundImage: `radial-gradient(circle at 50% 3.9575vh, rgb(255, 213, 133) 0vh,
       rgb(247, 77, 82) 50.011vh,
        rgb(145, 42, 105) 90.0183vh,
         rgba(32, 31, 66, 0) 140.599vh)`,
      duration: 3,
    }, "<1.2")

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="tweest-hero-container" ref={containerRef}>
      <div className="tweest-overlay" ref={overlayRef}></div>
      
      <div className="hero-1-container">
        <div className="hero-main-container" ref={heroMainContainerRef}>
          <img
            className="hero-main-logo"
            ref={heroMainLogoRef}
            draggable="false"
            alt="tweest logo"
          />
          <img
            className="hero-main-image"
            ref={heroMainImageRef}
            draggable="false"
            src="/backgroundnew.png"
            alt="tweest hero"
          />
        </div>
        <div className="hero-text-logo-container">
          <div className="hero-text-logo" ref={heroTextLogoRef}></div>
          <div>
            <h3 className="hero-text" ref={heroTextRef}>
             Not Your<br />
              Average <br />
              Fashion Brand
            </h3>
          </div>
        </div>
      </div>
      
      <div className="hero-2-container" ref={hero2ContainerRef}>
       
      </div>
      
      {/* Scroll Indicator */}
      <div className="scroll-indicator" ref={scrollIndicatorRef}>
        <svg
          width="34"
          height="14"
          viewBox="0 0 34 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="_1smfa210"
          focusable="false"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M33.5609 1.54346C34.0381 2.5875 33.6881 3.87821 32.7791 4.42633L17.0387 13.9181L1.48663 4.42115C0.580153 3.86761 0.235986 2.57483 0.717909 1.53365C1.19983 0.492464 2.32535 0.097152 3.23182 0.650692L17.0497 9.08858L31.051 0.64551C31.96 0.0973872 33.0837 0.499411 33.5609 1.54346Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
  )
}

export default TweestHero
