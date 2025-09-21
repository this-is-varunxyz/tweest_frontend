import React, { useRef } from 'react'
import { ReactLenis } from "lenis/dist/lenis-react"
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion"
import { FiArrowRight, FiMapPin, FiChevronDown } from "react-icons/fi"
import { assets } from '../assets/assets'

const SmoothScrollHero = () => {
  return (
    <div className="bg-white">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <Hero />
      </ReactLenis>
    </div>
  )
}

const Nav = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 text-black">
      <div className="text-xl sm:text-2xl font-bold mix-blend-difference">
        Forever
      </div>
      <button
        onClick={() => {
          document.getElementById("product-section")?.scrollIntoView({
            behavior: "smooth",
          })
        }}
        className="flex items-center gap-1 text-xs sm:text-sm text-zinc-600 hover:text-black transition-colors"
      >
        VIEW PRODUCTS <FiArrowRight />
      </button>
    </nav>
  )
}

const ScrollIndicator = () => {
  const { scrollY } = useScroll()
  
  // Calculate progress based on the hero section height
  const progress = useTransform(
    scrollY,
    [0, SECTION_HEIGHT],
    [0, 100]
  )
  
  // Fade out the indicator as we scroll
  const opacity = useTransform(
    scrollY,
    [0, 150],
    [1, 0]
  )

  return (
    <motion.div 
      className="fixed top-16 left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center gap-2"
      style={{ opacity }}
    >
      {/* Progress bar */}
      <div className="w-1 h-20 bg-black/30 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div 
          className="w-full bg-white rounded-full origin-top"
          style={{ 
            scaleY: useTransform(progress, [0, 100], [0, 1])
          }}
        />
      </div>
      
      {/* Scroll text and icon */}
      <div className="flex flex-col items-center gap-1 text-black/80 text-lg font-bold">
        <span>SCROLL</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <FiChevronDown className="w-4 h-4" />
        </motion.div>
      </div>
    </motion.div>
  )
}

const SECTION_HEIGHT = 1500

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <ScrollIndicator />
      <CenterImage />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-48 sm:h-64 lg:h-96 bg-gradient-to-b from-white/0 to-white" />
    </div>
  )
}

const CenterImage = () => {
  const { scrollY } = useScroll()

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0])
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100])

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  )
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  )

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: `url(${assets.hero_img})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  )
}

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32 lg:pt-[200px]">
      <ParallaxImg
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Fashion collection showcase"
        start={-100}
        end={100}
        className="w-32 xs:w-36 sm:w-48 md:w-56 lg:w-64 xl:w-1/3"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Premium fashion items"
        start={80}
        end={-120}
        className="mx-auto w-40 xs:w-44 sm:w-56 md:w-64 lg:w-72 xl:w-2/3 mt-6 sm:mt-8 lg:mt-12"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Elegant fashion display"
        start={-80}
        end={80}
        className="ml-auto w-32 xs:w-36 sm:w-48 md:w-56 lg:w-64 xl:w-1/3 mt-6 sm:mt-8 lg:mt-12"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Luxury fashion collection"
        start={0}
        end={-200}
        className="ml-2 xs:ml-3 sm:ml-6 md:ml-8 lg:ml-12 xl:ml-24 w-36 xs:w-40 sm:w-52 md:w-60 lg:w-72 xl:w-5/12 mt-6 sm:mt-8 lg:mt-12"
      />
    </div>
  )
}

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  })

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85])

  const y = useTransform(scrollYProgress, [0, 1], [start, end])
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`

  return (
    <motion.img
      src={src}
      alt={alt}
      className={`${className} h-auto object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300`}
      ref={ref}
      style={{ transform, opacity }}
      loading="lazy"
    />
  )
}

const ProductSection = () => {
  return (
    <section
      id="product-section"
      className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-48 text-black"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-12 sm:mb-16 lg:mb-20 text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-black"
      >
        Our Products
      </motion.h1>
      
      <div className="space-y-6 sm:space-y-8 lg:space-y-9">
        <ProductItem 
          title="Premium Collection" 
          description="Luxury fashion items" 
          category="Fashion" 
        />
        <ProductItem 
          title="Summer Collection" 
          description="Lightweight and comfortable" 
          category="Seasonal" 
        />
        <ProductItem 
          title="Designer Series" 
          description="Exclusive designer pieces" 
          category="Premium" 
        />
        <ProductItem 
          title="Casual Wear" 
          description="Everyday comfort" 
          category="Lifestyle" 
        />
        <ProductItem 
          title="Formal Collection" 
          description="Professional attire" 
          category="Business" 
        />
        <ProductItem 
          title="Sports Line" 
          description="Active and athletic wear" 
          category="Sports" 
        />
        <ProductItem 
          title="Accessories" 
          description="Complete your look" 
          category="Accessories" 
        />
      </div>
    </section>
  )
}

const ProductItem = ({ title, description, category }) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200 px-0 sm:px-3 pb-6 sm:pb-9 hover:border-zinc-400 transition-colors duration-300"
    >
      <div className="mb-4 sm:mb-0">
        <p className="mb-1.5 text-lg sm:text-xl text-black font-semibold">{title}</p>
        <p className="text-sm sm:text-base text-zinc-600">{description}</p>
      </div>
      <div className="flex items-center gap-1.5 text-sm uppercase text-zinc-500 font-medium">
        <p>{category}</p>
        <FiMapPin className="w-4 h-4" />
      </div>
    </motion.div>
  )
}

export default SmoothScrollHero