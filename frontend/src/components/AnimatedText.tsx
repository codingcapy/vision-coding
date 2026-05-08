import { useEffect, useRef, useState } from "react";

export const AnimatedText = ({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) => {
  const [addFadeRef, visibleElements, refs] = useFadeInOnScroll();
  return (
    <div
      ref={addFadeRef(id)}
      className={`${className} fade-in ${visibleElements.has(refs.current.get(id) as HTMLElement) ? "visible" : ""}`}
    >
      {children}
    </div>
  );
};

function useFadeInOnScroll() {
  const [visibleElements, setVisibleElements] = useState(
    new Set<HTMLElement>(),
  );
  const refs = useRef(new Map<string, HTMLElement>());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleElements((prevVisibleElements) => {
          const newVisibleElements = new Set(prevVisibleElements);
          entries.forEach((entry) => {
            const targetElement = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              newVisibleElements.add(targetElement);
            } else {
              newVisibleElements.delete(targetElement);
            }
          });
          return newVisibleElements;
        });
      },
      { threshold: 0.2 },
    );

    refs.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (key: string) => (el: HTMLElement | null) => {
    if (el) refs.current.set(key, el);
  };

  return [addRef, visibleElements, refs] as const;
}
