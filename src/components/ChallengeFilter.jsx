import { Select, SelectItem, SelectValue, SelectGroup, SelectTrigger, SelectContent } from "@/components/ui/select";

const challengeOptions = [
  { label: "All", value: "all" },
  { label: "Ongoing", value: "ONGOING" },
  { label: "Upcoming", value: "UPCOMING" },
];

export function ChallengeFilter({ value, onValueChange }) {
  return (
    <Select value={value} onValueChange={onValueChange} indicatorPosition='right'>
      <SelectTrigger className='w-[112px] absolute right-3 top-2'>
        <SelectValue placeholder='Filter Challenges' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {challengeOptions?.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
