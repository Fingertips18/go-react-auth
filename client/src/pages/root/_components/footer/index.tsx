const Footer = () => {
  return (
    <footer className="bg-secondary/10 backdrop-blur-lg border-t border-secondary/25 p-4">
      <p className="max-w-screen-lg mx-auto text-center text-sm font-medium text-foreground/60">
        &copy; {new Date().getUTCFullYear()} Fingertips. All rights reserved.
      </p>
    </footer>
  );
};

export { Footer };
