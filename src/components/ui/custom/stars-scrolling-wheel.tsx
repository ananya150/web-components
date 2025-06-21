'use client';

import * as React from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  type SpringOptions,
  type UseInViewOptions,
} from 'motion/react';
import {  type Variants } from 'motion/react';

import {
  getVariants,
  useAnimateIconContext,
  IconWrapper,
  type IconProps,
} from '@/components/ui/icons/icon';



import { cn } from '@/lib/utils';

type StarProps = IconProps<keyof typeof animations>;

const animations = {
  default: {
    group: {
      initial: {
        scale: 1,
      },
      animate: {
        scale: [1, 0.9, 1.2, 1],
        transition: { duration: 0.6, ease: 'easeInOut' },
      },
    },
    path: {},
  } satisfies Record<string, Variants>,
  fill: {
    group: {
      initial: {
        scale: 1,
      },
      animate: {
        scale: [1, 0.9, 1.2, 1],
        transition: { duration: 0.6, ease: 'easeInOut' },
      },
    },
    path: {
      initial: {
        fill: 'currentColor',
        fillOpacity: 0,
      },
      animate: {
        fillOpacity: 1,
        transition: { delay: 0.2 },
      },
    },
  } satisfies Record<string, Variants>,
} as const;

function IconComponent({ size, ...props }: StarProps) {
  const { controls } = useAnimateIconContext();
  const variants = getVariants(animations);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      variants={variants.group}
      initial="initial"
      animate={controls}
      {...props}
    >
      <motion.path
        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
        variants={variants.path}
        initial="initial"
        animate={controls}
      />
    </motion.svg>
  );
}

function Star(props: StarProps) {
  return <IconWrapper icon={IconComponent} {...props} />;
}

export {
  animations,
  Star,
  Star as StarIcon,
  type StarProps,
  type StarProps as StarIconProps,
};


const formatter = new Intl.NumberFormat('en-US');

function generateRange(
  max: number,
  step: number,
  sideItemsCount: number,
): number[] {
  const result: number[] = [];
  const end = max + sideItemsCount * step;
  for (let value = end; value >= 0; value -= step) {
    result.push(value);
  }
  return result;
}

type StarsScrollingWheelProps = {
  stars: number;
  step?: number;
  itemHeight?: number;
  sideItemsCount?: number;
  transition?: SpringOptions;
  inView?: boolean;
  inViewOnce?: boolean;
  inViewMargin?: UseInViewOptions['margin'];
  delay?: number;
} & React.ComponentProps<'div'>;

function StarsScrollingWheel({
  ref,
  stars,
  step = 100,
  itemHeight = 48,
  sideItemsCount = 2,
  transition = { stiffness: 90, damping: 30 },
  inView = false,
  inViewOnce = true,
  inViewMargin = '0px',
  delay = 0,
  className,
  style,
  ...props
}: StarsScrollingWheelProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  const inViewResult = useInView(containerRef, {
    once: inViewOnce,
    margin: inViewMargin,
  });
  const isInView = !inView || inViewResult;

  const displayedItemsCount = 1 + sideItemsCount * 2;
  const range = React.useMemo(
    () => generateRange(stars, step, sideItemsCount),
    [stars, step, sideItemsCount],
  );

  const initialY = -(itemHeight * sideItemsCount);
  const finalY = itemHeight * (range.length - displayedItemsCount);

  const yMotion = useMotionValue(initialY);
  const ySpring = useSpring(yMotion, transition);

  React.useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      yMotion.set(finalY);
    }, delay);
    return () => clearTimeout(timer);
  }, [isInView, finalY, yMotion, delay]);

  const currentIndex = useTransform(
    ySpring,
    (y) => y / itemHeight + sideItemsCount,
  );
  const currentValue = useTransform(currentIndex, (idx) => idx * step);
  const completedTransform = useTransform(
    currentValue,
    (val) => val >= stars * 0.99,
  );

  const [isCompleted, setCompleted] = React.useState<boolean>(
    completedTransform.get(),
  );
  React.useEffect(() => {
    const unsubscribe = completedTransform.on('change', (latest) => {
      if (latest) setCompleted(true);
    });
    return unsubscribe;
  }, [completedTransform]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden w-[200px] bg-background',
        className,
      )}
      style={{ height: itemHeight * displayedItemsCount, ...style }}
      {...props}
    >
      <div
        className="absolute z-2 top-0 inset-x-0 bg-gradient-to-t from-transparent to-background"
        style={{ height: itemHeight }}
      />
      <div
        className="absolute z-1 top-0 inset-x-0 bg-background/60"
        style={{ height: itemHeight * sideItemsCount }}
      />

      <div
        className="absolute z-1 bottom-0 inset-x-0 bg-gradient-to-b from-transparent to-background"
        style={{ height: itemHeight }}
      />
      <div
        className="absolute z-1 bottom-0 inset-x-0 bg-background/60"
        style={{ height: itemHeight * sideItemsCount }}
      />

      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
        <div
          className="w-full bg-muted rounded-xl flex items-center justify-start px-6"
          style={{ height: itemHeight }}
        >
          <div className="relative inline-flex size-[28px] shrink-0">
            <Star
              animation="fill"
              animate={isCompleted}
              className="text-yellow-500"
            />
            <AnimatePresence>
              {isCompleted && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(255,215,0,0.4) 0%, rgba(255,215,0,0) 70%)',
                    }}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: [1.2, 1.8, 1.2], opacity: [0, 0.3, 0] }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ boxShadow: '0 0 10px 2px rgba(255,215,0,0.6)' }}
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-yellow-500"
                      initial={{ x: '50%', y: '50%', scale: 0, opacity: 0 }}
                      animate={{
                        x: `calc(50% + ${Math.cos((i * Math.PI) / 3) * 30}px)`,
                        y: `calc(50% + ${Math.sin((i * Math.PI) / 3) * 30}px)`,
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.05,
                        ease: 'easeOut',
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute left-17 bottom-0 text-start flex items-center justify-center flex-col"
        style={{ y: ySpring }}
      >
        {range.map((value) => (
          <div
            key={value}
            className="text-2xl font-bold flex items-center justify-start w-full"
            style={{ height: itemHeight }}
          >
            {formatter.format(value)}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export { StarsScrollingWheel, type StarsScrollingWheelProps };
