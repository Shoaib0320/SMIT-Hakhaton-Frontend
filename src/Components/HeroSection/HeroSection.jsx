import { Image } from "antd";

export default function HeroSection() {
    return (
      <section className="text-gray-600 my-10 body-font">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center">
          <div className="lg:flex-grow md:w-1/2 lg:w-3/5 xl:pr-16 md:pr-8 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="font-serif sm:text-3xl sm:mx-10 text-2xl mb-4 text-gray-900">
              Welcome To 
              <br className="hidden lg:inline-block" />
              <span className="sm:ml-2">Attari Collection</span>
              </h1>
            <p className="mb-8 leading-relaxed text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl">
              Discover the latest trends and unbeatable deals at Attari Collection! From fashion-forward apparel to cutting-edge gadgets, we bring you a curated selection of premium products at prices you’ll love. Shop with confidence and enjoy fast shipping, easy returns, and 24/7 customer support. Elevate your style, upgrade your lifestyle, and experience shopping redefined. **Shop Now & Transform Your Wardrobe Today!**
            </p>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-full flex justify-center md:justify-end mb-10 md:mb-0">
            <Image
              className="object-cover object-center rounded"
              alt="hero"
              height={300}
              width={400}
              src="https://i.pinimg.com/236x/03/c0/53/03c0532668f34d60af2517f87a283ecc.jpg"
            />
          </div>
        </div>
      </section>
    );
  }
  