import { useState, useEffect, useRef, useCallback } from "react";
import { Cat, Paw, Heart, Eye, Ear, MessageCircle, Facebook, Twitter, Instagram, ArrowRight, Check, X, Moon, Sun, Camera, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import confetti from 'canvas-confetti';

const catCharacteristics = [
  { icon: <Paw className="h-6 w-6" />, text: "Excellent hunters with sharp claws and teeth" },
  { icon: <Heart className="h-6 w-6" />, text: "Flexible bodies and quick reflexes" },
  { icon: <Eye className="h-6 w-6" />, text: "Keen senses, especially night vision" },
  { icon: <Ear className="h-6 w-6" />, text: "Exceptional hearing abilities" },
  { icon: <MessageCircle className="h-6 w-6" />, text: "Communicate through vocalizations and body language" },
];

const catBreeds = [
  { name: "Siamese", description: "Known for their distinctive color points and vocal nature.", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg", personality: "Talkative, intelligent, and social", lifespan: "12-15 years", affectionLevel: 85, energyLevel: 70, groomingNeeds: 30, intelligence: 90 },
  { name: "Persian", description: "Recognized for their long, luxurious coat and flat face.", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg", personality: "Calm, gentle, and affectionate", lifespan: "10-17 years", affectionLevel: 75, energyLevel: 40, groomingNeeds: 90, intelligence: 70 },
  { name: "Maine Coon", description: "One of the largest domestic cat breeds with a friendly personality.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG", personality: "Friendly, playful, and good with children", lifespan: "9-15 years", affectionLevel: 80, energyLevel: 60, groomingNeeds: 60, intelligence: 85 },
  { name: "British Shorthair", description: "Characterized by their round face and dense, plush coat.", image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Britishblue.jpg", personality: "Easygoing, calm, and independent", lifespan: "12-20 years", affectionLevel: 60, energyLevel: 50, groomingNeeds: 40, intelligence: 75 },
  { name: "Scottish Fold", description: "Famous for their unique folded ears and owl-like appearance.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Adult_Scottish_Fold.jpg", personality: "Sweet-tempered, adaptable, and intelligent", lifespan: "11-14 years", affectionLevel: 70, energyLevel: 55, groomingNeeds: 50, intelligence: 80 },
];

const catCareItems = [
  { title: "Nutrition", content: "Provide a balanced diet with high-quality cat food. Ensure fresh water is always available." },
  { title: "Grooming", content: "Brush your cat regularly to prevent matting and hairballs. Trim nails as needed." },
  { title: "Exercise", content: "Encourage play with toys and interactive games to keep your cat physically and mentally stimulated." },
  { title: "Health Check-ups", content: "Schedule regular vet visits for vaccinations and health screenings." },
  { title: "Litter Box Maintenance", content: "Clean the litter box daily and provide enough boxes for multi-cat households." },
];

const Index = () => {
  const [funFact, setFunFact] = useState("Cats sleep for about 70% of their lives.");
  const [currentBreedIndex, setCurrentBreedIndex] = useState(0);
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  }, [mouseX, mouseY]);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [darkMode, handleMouseMove]);

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

  const generateQuizQuestion = () => {
    const questions = [
      { question: "What is a group of cats called?", answer: "Clowder" },
      { question: "How many hours do cats typically sleep in a day?", answer: "16" },
      { question: "What is the average lifespan of a domestic cat?", answer: "15" },
      { question: "Which cat breed is known for its lack of tail?", answer: "Manx" },
      { question: "What is the proper term for a male cat?", answer: "Tom" },
    ];
    setQuizQuestion(questions[Math.floor(Math.random() * questions.length)]);
    setUserAnswer("");
  };

  const handleQuizAnswer = () => {
    setQuizTotal(quizTotal + 1);
    if (userAnswer.toLowerCase() === quizQuestion.answer.toLowerCase()) {
      setQuizScore(quizScore + 1);
      setShowConfetti(true);
      toast({
        title: "Correct!",
        description: "Great job! You got it right!",
        duration: 3000,
      });
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer was: ${quizQuestion.answer}`,
        duration: 3000,
      });
    }
    generateQuizQuestion();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBreedIndex((prevIndex) => (prevIndex + 1) % catBreeds.length);
    }, 5000);
    generateQuizQuestion();
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showConfetti) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [showConfetti]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-blue-100 to-purple-100'}`}>
      <div className="fixed top-4 right-4 z-50">
        <div className="flex items-center space-x-2">
          <Sun className="h-4 w-4" />
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          <Moon className="h-4 w-4" />
        </div>
      </div>
      <motion.div 
        ref={heroRef}
        style={{ opacity, scale }}
        className="relative h-screen bg-cover bg-center flex items-center justify-center sticky top-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={`absolute inset-0 ${darkMode ? 'bg-gray-800' : 'bg-black'} bg-opacity-50 flex items-center justify-center`}>
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
          <Button variant="outline" size="lg" className="bg-white bg-opacity-20 backdrop-blur-lg hover:bg-opacity-30 transition-all duration-300">
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
              whileHover={{ scale: 1.05 }}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-all duration-300`}
            >
              <div className={`${darkMode ? 'bg-purple-900' : 'bg-purple-100'} p-4 rounded-full mb-4`}>
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
        <Tabs defaultValue="gallery" className="mb-16">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="explorer">Breed Explorer</TabsTrigger>
          </TabsList>
          <TabsContent value="gallery">
            <Carousel>
              <CarouselContent>
                {catBreeds.map((breed, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card className={`${darkMode ? 'bg-gray-800' : ''} overflow-hidden`}>
                        <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                          <motion.div 
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            <img src={breed.image} alt={breed.name} className="w-full h-64 object-cover rounded-lg mb-4" />
                            <h3 className="text-2xl font-semibold mb-2">{breed.name}</h3>
                            <p>{breed.description}</p>
                          </motion.div>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 hover:opacity-20 transition-opacity duration-300"
                            whileHover={{ opacity: 0.2 }}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </TabsContent>
          <TabsContent value="explorer">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">{catBreeds[currentBreedIndex].name}</h3>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img src={catBreeds[currentBreedIndex].image} alt={catBreeds[currentBreedIndex].name} className="w-full h-64 object-cover rounded-lg mb-4 shadow-lg" />
                </motion.div>
                <p className="mb-2">{catBreeds[currentBreedIndex].description}</p>
                <p className="mb-2"><strong>Personality:</strong> {catBreeds[currentBreedIndex].personality}</p>
                <p><strong>Average Lifespan:</strong> {catBreeds[currentBreedIndex].lifespan}</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Breed Characteristics</h3>
                <ul className="space-y-4">
                  <li>
                    <strong>Affection Level:</strong>
                    <Progress value={catBreeds[currentBreedIndex].affectionLevel} className="mt-2" />
                  </li>
                  <li>
                    <strong>Energy Level:</strong>
                    <Progress value={catBreeds[currentBreedIndex].energyLevel} className="mt-2" />
                  </li>
                  <li>
                    <strong>Grooming Needs:</strong>
                    <Progress value={catBreeds[currentBreedIndex].groomingNeeds} className="mt-2" />
                  </li>
                  <li>
                    <strong>Intelligence:</strong>
                    <Progress value={catBreeds[currentBreedIndex].intelligence} className="mt-2" />
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-semibold mb-8 text-center">Cat Photo Booth</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mx-auto block">
                <Camera className="mr-2 h-4 w-4" /> Open Photo Booth
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Cat Photo Booth</DialogTitle>
                <DialogDescription>
                  Take a picture with your cat or upload one!
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="picture" className="text-right">
                    Picture
                  </Label>
                  <Input id="picture" type="file" accept="image/*" className="col-span-3" />
                </div>
              </div>
              <Button type="submit">Upload</Button>
            </DialogContent>
          </Dialog>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-semibold mb-8 text-center"
        >
          Cat Care Tips
        </motion.h2>
        <Accordion type="single" collapsible className="mb-16">
          {catCareItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-semibold mb-8 text-center"
        >
          Cat Quiz
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-12 relative overflow-hidden">
            <CardContent className="p-8">
              {quizQuestion && (
                <>
                  <p className="text-xl mb-6 text-center font-semibold">{quizQuestion.question}</p>
                  <div className="flex justify-center space-x-4">
                    <Input
                      type="text"
                      placeholder="Your answer"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleQuizAnswer()}
                      className="max-w-xs"
                    />
                    <Button onClick={handleQuizAnswer}>
                      Submit
                    </Button>
                  </div>
                  <motion.p 
                    className="text-center mt-6 text-lg font-semibold"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    Score: {quizScore} / {quizTotal}
                  </motion.p>
                </>
              )}
            </CardContent>
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${smoothMouseX}px ${smoothMouseY}px, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%)`,
              }}
            />
          </Card>
        </motion.div>

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
          <Card className="mb-12 relative overflow-hidden">
            <CardContent className="p-8">
              <motion.p 
                className="text-xl mb-6 text-center"
                key={funFact}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {funFact}
              </motion.p>
              <div className="flex justify-center">
                <Button onClick={generateFunFact} size="lg">
                  <Sparkles className="mr-2 h-4 w-4" /> Generate New Fact
                </Button>
              </div>
            </CardContent>
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${smoothMouseX}px ${smoothMouseY}px, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%)`,
              }}
            />
          </Card>
        </motion.div>

        <Alert className="mb-12">
          <Cat className="h-4 w-4" />
          <AlertTitle>Did you know?</AlertTitle>
          <AlertDescription>
            Cats have been domesticated for over 4,000 years, but they still retain many of their wild instincts!
          </AlertDescription>
        </Alert>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl italic text-center"
        >
          Whether you're a cat owner or just an admirer, these furry friends continue to captivate us with their charm and mystery.
        </motion.p>
      </div>

      <footer className={`${darkMode ? 'bg-gray-900' : 'bg-gray-800'} text-white py-12`}>
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <motion.p 
            className="text-lg mb-4 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            &copy; 2023 All About Cats
          </motion.p>
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
