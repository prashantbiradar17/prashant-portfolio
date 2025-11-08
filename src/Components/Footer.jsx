// Footer.jsx
// ...
export const Footer = () => { // Changed from const Footer = () => { or export default Footer;
  return (
    <footer>
      <p className="capitalize mb-4">&copy; {new Date().getFullYear()}  all rights are reserved</p>
    </footer>
  );
};
// ...
