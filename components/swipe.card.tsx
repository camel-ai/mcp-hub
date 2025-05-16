import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

interface BlogCardData {
  id: number;
  src: string;
  title: string;
  description: string;
  link: string;
}

const blogCards: BlogCardData[] = [
  {
    id: 1,
    src: "/camel-ai-agent-mcp-integration.png",
    title: "How to Connect Your CAMEL-AI Agent to External Tools via MCP",
    description: "Seamlessly integrate databases, APIs, and web services into your CAMEL-AI agents using the Model Context Protocol.",
    link: "https://www.camel-ai.org/blogs/camel-ai-agent-mcp-integration",
  },
  {
    id: 2,
    src: "/connect-your-owl-agent-to-notion-via-the-mcp-server.png",
    title: "How to Connect Your OWL Agent to Notion via the MCP Server",
    description: "Empower your CAMEL-AI OWL agent to interact with Notion using the MCP server.",
    link: "https://www.camel-ai.org/blogs/connect-your-owl-agent-to-notion-via-the-mcp-server",
  },
  {
    id: 3,
    src: "/camel-mcp-servers-model-context-protocol-ai-agents.png",
    title: "CAMEL x MCP: Making AI Agents Accessible to All Tools",
    description: "A lightweight server that exports Camel framework toolkits as MCP-compatible tools.",
    link: "https://www.camel-ai.org/blogs/camel-mcp-servers-model-context-protocol-ai-agents",
  },
];

const ArrowButton = ({ direction, onClick }: { direction: 'left' | 'right', onClick: () => void }) => (
  <button
    onClick={onClick}
    aria-label={direction === 'left' ? 'Previous card' : 'Next card'}
    className="mx-2 p-2 rounded-full bg-card border shadow hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
    type="button"
  >
    {direction === 'left' ? (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
    ) : (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
    )}
  </button>
);

const SwipeCards = () => {
  const [cards, setCards] = useState<BlogCardData[]>(blogCards);

  // Auto-rotate cards effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (cards.length > 0) {
        setCards(prevCards => {
          const newCards = [...prevCards];
          const lastCard = newCards.pop();
          if (lastCard) {
            newCards.unshift(lastCard);
          }
          return newCards;
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [cards]);

  // Manual navigation handlers
  const handlePrev = () => {
    setCards(prevCards => {
      if (prevCards.length === 0) return prevCards;
      const newCards = [...prevCards];
      const firstCard = newCards.shift();
      if (firstCard) {
        newCards.push(firstCard);
      }
      return newCards;
    });
  };

  const handleNext = () => {
    setCards(prevCards => {
      if (prevCards.length === 0) return prevCards;
      const newCards = [...prevCards];
      const lastCard = newCards.pop();
      if (lastCard) {
        newCards.unshift(lastCard);
      }
      return newCards;
    });
  };

  return (
    <div className="relative w-full h-[350px] flex flex-col items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        {cards.map((card) => (
          <BlogSwipeCard key={card.id} cards={cards} setCards={setCards} {...card} />
        ))}
      </div>
      <div className="flex items-center justify-center mt-12">
        <ArrowButton direction="left" onClick={handlePrev} />
        <ArrowButton direction="right" onClick={handleNext} />
      </div>
    </div>
  );
};

const BlogSwipeCard = ({ id, src, title, description, link, setCards, cards }: BlogCardData & {
  setCards: React.Dispatch<React.SetStateAction<BlogCardData[]>>;
  cards: BlogCardData[];
}) => {
  const x = useMotionValue(0);
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  const isFront = id === cards[cards.length - 1].id;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : id % 2 ? 6 : -6;
    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 100) {
      setCards((prevCards: BlogCardData[]) => {
        const filtered = prevCards.filter((card: BlogCardData) => card.id !== id);
        filtered.unshift({ id, src, title, description, link });
        return filtered;
      });
    }
  };

  return (
    <motion.div
      className="absolute w-full h-full flex items-center justify-center"
      style={{
        x,
        opacity,
        rotate,
        zIndex: isFront ? 1 : 0,
        transition: "0.125s transform",
      }}
      animate={{
        scale: isFront ? 1 : 0.95,
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
    >
      <div className="flex-shrink-0 w-full max-w-xs lg:max-w-sm">
        <a
          href={link}
          className="block bg-card rounded-xl shadow-lg overflow-hidden border p-4 transition-all duration-300 hover:border-secondary focus:border-primary outline-none"
          tabIndex={0}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="relative w-full h-48 rounded-lg">
            <Image
              src={src}
              alt={title}
              fill
              style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
              priority={isFront}
            />
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
          </div>
        </a>
      </div>
    </motion.div>
  );
};

export default SwipeCards;