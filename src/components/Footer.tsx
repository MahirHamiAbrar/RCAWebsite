export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 sm:gap-10 px-4 sm:px-6 py-8 sm:py-10 md:flex-row md:justify-between">
        <div className="flex-1 space-y-2">
          <h3 className="text-base sm:text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-sm sm:text-base">Rajshahi City Association</p>
          <p className="text-sm sm:text-base">Rajshahi University of Engineering and Technology-6204</p>
          <p className="text-sm sm:text-base">
            Email:{" "}
            <a
              href="mailto:rcaruet@gmail.com"
              className="underline underline-offset-4 hover:text-amber-100"
            >
              rcaruet@gmail.com
            </a>
          </p>
          <p className="text-sm sm:text-base">
            Facebook:{" "}
            <a
              href="https://www.facebook.com/profile.php?id=100069227313850"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-amber-100"
            >
              RCA Page
            </a>
          </p>
          <p className="text-sm sm:text-base">
            Group:{" "}
            <a
              href="https://www.facebook.com/groups/183436285027318"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-amber-100"
            >
              RCA Group
            </a>
          </p>
        </div>

        <div className="flex-1 space-y-2">
          <h3 className="text-base sm:text-lg font-semibold mb-2">Useful Links</h3>
          <ul className="space-y-1 text-sm sm:text-base">
            <li>
              <a
                href="https://cao.gov.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:underline-offset-4"
              >
                প্রধান উপদেষ্টার কার্যালয়
              </a>
            </li>
            <li>
              <a
                href="https://shed.gov.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:underline-offset-4"
              >
                Ministry of Education
              </a>
            </li>
            <li>
              <a
                href="https://dshe.gov.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:underline-offset-4"
              >
                DSHE
              </a>
            </li>
            <li>
              <a
                href="https://www.ruet.ac.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:underline-offset-4"
              >
                RUET
              </a>
            </li>
            <li>
              <a
                href="https://www.iebbd.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:underline-offset-4"
              >
                IEB
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="pb-8 text-center text-xs sm:text-sm text-white/90">
        Talha © 2025
      </div>
    </footer>
  );
}
