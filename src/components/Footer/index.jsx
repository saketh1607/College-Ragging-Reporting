function Footer() {
  return (
    <footer className="bg-[#a1b5e7] text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold">VNRVJIET Anti-Ragging Portal</h3>
            <p className="mt-1">Making our campus safe for everyone</p>
          </div>
          <div className="text-center md:text-right">
            <p>© {new Date().getFullYear()} VNRVJIET</p>
            <p className="text-sm mt-1">
              For urgent help, contact:{" "}
              <a href="tel:+919XXXXXXXX" className="text-blue-600 hover:underline">
                +91 9XXXXXXXX
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
