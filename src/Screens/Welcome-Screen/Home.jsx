import { Phone, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Image } from "antd";
import { AppRoutes } from "@/Constant/Constant";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/Components/Navbar/Navbar";

export default function Home() {
  const [category, setCategory] = useState([]);

  const fetchCategory = async () => {
    try {
      const response = await fetch(AppRoutes.getCategoriesWithSubCategories);
      if (!response.ok) throw new Error("Failed to fetch category");
      const data = await response.json();
      setCategory(data.data);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="min-h-screen">

      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold leading-tight">
              Welcome to the <span className="text-[#8DC63F]">Saylani</span> Welfare
            </h1>
            <h2 className="text-4xl font-bold mt-2 mb-6">
              Non Governmental Organization in Pakistan
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              The largest NGO offering free clean water, healthcare, and education. Saylani Welfare is on the ground
              and already working with local communities to assess how best to support underprivileged families in
              more than 63 areas of day to day lives.
            </p>
            <Button className="bg-[#0D6DB7] hover:bg-[#0b5a9a] text-lg px-8 py-6">
              Explore More
              <Globe className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="rounded-full overflow-hidden shadow-lg">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Saylani Activity 1"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-full overflow-hidden shadow-lg">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Saylani Activity 2"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="mt-12 space-y-6">
                <div className="rounded-full overflow-hidden shadow-lg">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Saylani Activity 3"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-full overflow-hidden shadow-lg">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Saylani Activity 4"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#8DC63F]/10 rounded-full blur-3xl"></div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
          {category.map((e, index) => (
            <div
              className="relative bg-gray-100 text-black rounded-lg shadow-lg p-6 flex items-center"
              key={e._id}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white font-bold rounded-full">
                {index + 1}
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-xl font-bold">{e.title}</h3>
              </div>
              <Link
                to={`/category/${e._id}`}
                className="text-blue-500 hover:text-blue-700"
              >
                <i className="fa-solid fa-arrow-up-right-from-square text-lg"></i>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
