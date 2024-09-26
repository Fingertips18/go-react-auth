const Footer = () => {
  return (
    <footer className="bg-secondary/10 backdrop-blur-lg border-t border-secondary/25 p-4">
      <p className="max-w-screen-lg mx-auto text-center text-xs lg:text-sm font-medium text-foreground/60">
        &copy; {new Date().getUTCFullYear()} Fingertips{" "}
        <span className="text-foreground/40 font-medium">(Ghian)</span>. All
        rights reserved.
      </p>
    </footer>
  );
};

export { Footer };
