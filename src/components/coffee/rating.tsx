import { Badge } from "@/components/ui/badge";
export interface RatingProps {
    rating: number;
}

export default function Rating(props: RatingProps) {
    const rating = Intl.NumberFormat(
      undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
      }).format(props.rating);

    return (
      <Badge variant={"outline"}>{rating} / 5.00</Badge>
    )
}