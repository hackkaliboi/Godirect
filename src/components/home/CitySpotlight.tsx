import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CitySpotlight = () => {
  const [activeTab, setActiveTab] = useState("enugu");

  // Cities data will be fetched from Supabase
  const cities: any[] = [];

  const activeCity = cities.find(city => city.id === activeTab) || cities[0];

  if (cities.length === 0) {
    return (
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-realty-900 dark:text-white mb-4">
            City <span className="text-realty-gold">Spotlight</span>
          </h2>
          <p className="text-realty-600 dark:text-realty-300 max-w-2xl mx-auto">
            Discover the unique charm and investment opportunities in Nigeria's most vibrant cities.
          </p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 text-center max-w-md mx-auto">
          <p className="text-xl text-realty-600 dark:text-realty-400">City spotlight data will be available soon</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-realty-900 dark:text-white mb-4">
          City <span className="text-realty-gold">Spotlight</span>
        </h2>
        <p className="text-realty-600 dark:text-realty-300 max-w-2xl mx-auto">
          Discover the unique charm and investment opportunities in Nigeria's most vibrant cities.
        </p>
      </div>

      <Tabs defaultValue={cities[0]?.id} value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="bg-realty-100 dark:bg-realty-800/50 p-1 rounded-full">
            {cities.map(city => (
              <TabsTrigger 
                key={city.id} 
                value={city.id}
                className="rounded-full px-6 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-realty-700 data-[state=active]:text-realty-900 dark:data-[state=active]:text-white data-[state=active]:shadow-sm"
              >
                {city.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {cities.map(city => (
          <TabsContent key={city.id} value={city.id} className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1 animate-fade-up">
                <h3 className="text-2xl font-heading font-semibold text-realty-900 dark:text-white mb-4">
                  {city.name} - A City of Opportunity
                </h3>
                <p className="text-realty-600 dark:text-realty-300 mb-6">
                  {city.description}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {city.stats?.map((stat: any, index: number) => (
                    <div key={index} className="bg-white dark:bg-realty-800/50 rounded-lg p-4 shadow-sm">
                      <p className="text-realty-500 dark:text-realty-400 text-sm">{stat.label}</p>
                      <p className="text-realty-900 dark:text-white text-xl font-semibold">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-realty-900 dark:text-white mb-2">
                    Popular Neighborhoods
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {city.neighborhoods?.map((neighborhood: string, index: number) => (
                      <span 
                        key={index} 
                        className="inline-block bg-realty-100 dark:bg-realty-800/70 text-realty-700 dark:text-realty-300 rounded-full px-3 py-1 text-sm"
                      >
                        {neighborhood}
                      </span>
                    ))}
                  </div>
                </div>

                <Button 
                  asChild
                  className="group bg-realty-800 hover:bg-realty-900 text-white dark:bg-realty-gold dark:text-realty-900 dark:hover:bg-realty-gold/90"
                >
                  <Link to={`/properties?location=${city.name}`}>
                    Explore {city.name} Properties
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              <div className="order-1 lg:order-2 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-xl">
                  <img 
                    src={city.image} 
                    alt={`${city.name} cityscape`} 
                    className="w-full h-full object-cover transition-transform duration-10000 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-realty-900/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white text-xl font-semibold">{city.name}</h4>
                    <p className="text-white/80 text-sm">Nigeria</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CitySpotlight;
