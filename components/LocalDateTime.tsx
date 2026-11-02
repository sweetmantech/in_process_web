"use client";

import { useLocalDateTime } from "@/hooks/useLocalDateTime";

interface LocalDateTimeProps {
  value: string;
  className?: string;
}

const LocalDateTime = ({ value, className }: LocalDateTimeProps) => {
  const text = useLocalDateTime(value);
  return (
    <time dateTime={value} className={className}>
      {text}
    </time>
  );
};

export default LocalDateTime;
