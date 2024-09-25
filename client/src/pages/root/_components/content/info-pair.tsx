interface InfoPairProps {
  label: string;
  value?: string;
}

const InfoPair = ({ label, value }: InfoPairProps) => {
  return (
    <p className="font-medium flex items-center gap-x-2 px-6 py-4 border-b border-secondary/50">
      {label}:<span className="font-semibold text-secondary">{value}</span>
    </p>
  );
};

export { InfoPair };
