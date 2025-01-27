
export default function HeroSection() {
    return (
        <section className="text-gray-600 my-10 body-font">
            <div className="container mx-auto flex flex-col-reverse md:flex-row items-center">
                <div className="lg:flex-grow md:w-1/2 lg:w-3/5 xl:pr-16 md:pr-8 flex flex-col md:items-start md:text-left items-center text-center">
                    <h1 className="font-serif sm:text-3xl sm:mx-10 text-2xl mb-4 text-gray-900">
                        Welcome To 
                        <br className="hidden lg:inline-block" />
                        <span className="sm:ml-2">Saylani Microfinance</span>
                    </h1>
                    <p className="mb-8 leading-relaxed text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl">
                        Empowering communities with financial independence, Saylani Microfinance is dedicated to improving lives by providing accessible financial solutions. From small business loans to saving plans, we aim to uplift underprivileged families and encourage entrepreneurship. Backed by the visionary leadership of our esteemed Chairman, we are committed to fostering economic growth and building a prosperous future for all.
                    </p>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-full flex justify-center md:justify-end mb-10 md:mb-0">
                    <img
                        className="object-cover object-center rounded"
                        alt="Saylani Chairman"
                        height={300}
                        width={400}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmIdBf0pXzKH7fg-YAannkunO4_e3l7jmhxw&s" // Replace with chairman's image URL
                    />
                </div>
            </div>
        </section>
    );
}
