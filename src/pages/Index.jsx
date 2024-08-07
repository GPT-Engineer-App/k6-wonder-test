import { useState, useEffect } from "react";
import { Cat, Paw, Heart, Eye, Ear, MessageCircle, Facebook, Twitter, Instagram, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const catCharacteristics = [
  { icon: <Paw className="h-6 w-6" />, text: "Excellent hunters with sharp claws and teeth" },
  { icon: <Heart className="h-6 w-6" />, text: "Flexible bodies and quick reflexes" },
  { icon: <Eye className="h-6 w-6" />, text: "Keen senses, especially night vision" },
  { icon: <Ear className="h-6 w-6" />, text: "Exceptional hearing abilities" },
  { icon: <MessageCircle className="h-6 w-6" />, text: "Communicate through vocalizations and body language" },
];

const catBreeds = [
  { name: "Siamese", description: "Known for their distinctive color points and vocal nature.", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
  { name: "Persian", description: "Recognized for their long, luxurious coat and flat face.", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
  { name: "Maine Coon", description: "One of the largest domestic cat breeds with a friendly personality.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
  { name: "British Shorthair", description: "Characterized by their round face and dense, plush coat.", image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Britishblue.jpg" },
  { name: "Scottish Fold", description: "Famous for their unique folded ears and owl-like appearance.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Adult_Scottish_Fold.jpg" },
];

const Index = () => {
  const [funFact, setFunFact] = useState("Cats sleep for about 70% of their lives.");
  const [currentBreedIndex, setCurrentBreedIndex] = useState(0);

  const generateFunFact = () => {
    const facts = [
      "A group of cats is called a clowder.",
      "Cats have over 20 vocalizations, including the meow.",
      "A cat's nose print is unique, like a human's fingerprint.",
      "Cats can jump up to six times their length.",
      "The first cat in space was French. Her name was Felicette.",
    ];
    setFunFact(facts[Math.floor(Math.random() * facts.length)]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBreedIndex((prevIndex) => (prevIndex + 1) % catBreeds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{backgroundImage: "url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"}}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-6xl font-bold text-white mb-6 flex items-center"
          >
            <Cat className="mr-4 h-16 w-16" /> All About Cats
          </motion.h1>
        </div>
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <Button variant="outline" size="lg" className="bg-white bg-opacity-20 backdrop-blur-lg">
            Explore More <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl mb-12 text-center"
        >
          Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their independence, agility, and affectionate nature.
        </motion.p>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-semibold mb-8 text-center"
        >
          Characteristics of Cats
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {catCharacteristics.map((char, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                {char.icon}
              </div>
              <span className="text-lg">{char.text}</span>
            </motion.div>
          ))}
        </div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-semibold mb-8 text-center"
        >
          Popular Cat Breeds
        </motion.h2>
        <Carousel className="mb-16">
          <CarouselContent>
            {catBreeds.map((breed, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <div className="text-center">
                        <img src={breed.image} alt={breed.name} className="w-full h-64 object-cover rounded-lg mb-4" />
                        <h3 className="text-2xl font-semibold mb-2">{breed.name}</h3>
                        <p>{breed.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-semibold mb-8 text-center"
        >
          Cat Fun Fact
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-12">
            <CardContent className="p-8">
              <p className="text-xl mb-6 text-center">{funFact}</p>
              <div className="flex justify-center">
                <Button onClick={generateFunFact} size="lg">
                  Generate New Fact
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl italic text-center"
        >
          Whether you're a cat owner or just an admirer, these furry friends continue to captivate us with their charm and mystery.
        </motion.p>
      </div>

      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-lg mb-4 md:mb-0">&copy; 2023 All About Cats</p>
          <div className="flex space-x-6">
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Facebook className="h-8 w-8 cursor-pointer" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Twitter className="h-8 w-8 cursor-pointer" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Instagram className="h-8 w-8 cursor-pointer" />
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
