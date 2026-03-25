import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full bg-[#2c2c2c] text-gray-300 pt-14 pb-10 border-t border-[#3c3c3c]">

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-4">

        {/* TOP ROW: LOGO + SOCIAL */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
          
          {/* LOGO + Social icons */}
          <div>
            <h1 className="text-2xl font-semibold text-purple-500 mb-3">MarkeX</h1>
            <p className="text-xs opacity-80">© 2025 MarkeX Trading Ltd.</p>
            <p className="text-xs opacity-80 mb-4">All rights reserved.</p>

            {/* Social icons */}
            <div className="flex gap-3 text-xl mt-2">
              <FaTwitter className="hover:text-[#4DA6FF] cursor-pointer transition" />
              <FaFacebookF className="hover:text-[#4DA6FF] cursor-pointer transition" />
              <FaInstagram className="hover:text-[#4DA6FF] cursor-pointer transition" />
              <FaLinkedin className="hover:text-[#4DA6FF] cursor-pointer transition" />
              <FaYoutube className="hover:text-[#4DA6FF] cursor-pointer transition" />
            </div>
          </div>

          {/* FOOTER NAVIGATION GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 text-sm">

            {/* Company */}
            <div>
              <h3 className="font-semibold text-[#4DA6FF] mb-2">Company</h3>
              <ul className="space-y-1">
                <li className="hover:text-white cursor-pointer">About</li>
                <li className="hover:text-white cursor-pointer">Products</li>
                <li className="hover:text-white cursor-pointer">Pricing</li>
                <li className="hover:text-white cursor-pointer">Referral Programme</li>
                <li className="hover:text-white cursor-pointer">Careers</li>
                <li className="hover:text-white cursor-pointer">Media & Press</li>
                <li className="hover:text-white cursor-pointer">Investors</li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-[#4DA6FF] mb-2">Support</h3>
              <ul className="space-y-1">
                <li className="hover:text-white cursor-pointer">Contact</li>
                <li className="hover:text-white cursor-pointer">Support Portal</li>
                <li className="hover:text-white cursor-pointer">Z-Connect Blog</li>
                <li className="hover:text-white cursor-pointer">List of Charges</li>
                <li className="hover:text-white cursor-pointer">Downloads & Resources</li>
              </ul>
            </div>

            {/* Account */}
            <div>
              <h3 className="font-semibold text-[#4DA6FF] mb-2">Account</h3>
              <ul className="space-y-1">
                <li className="hover:text-white cursor-pointer">Open an Account</li>
                <li className="hover:text-white cursor-pointer">Fund Transfer</li>
                <li className="hover:text-white cursor-pointer">60 Day Challenge</li>
              </ul>
            </div>

          </div>
        </div>

        {/* DISCLAIMER TEXT */}
        <div className="mt-12 text-xs leading-5 opacity-80">
          <p>
           Zerodha Broking Ltd.: Member of NSE, BSE MCX SEBI Registration no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any complaints pertaining to securities broking please write to complaints@zerodha.com, for DP related to dp@zerodha.com. Please ensure you carefully read the Risk Disclosure Document as prescribed by SEBI | ICF
          </p>

          <p className="mt-3">
            Procedure to file a complaint on SEBI SCORES: Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of the grievances
          </p>

          <p className="mt-3">
            Investments in securities market are subject to market risks; read all the related documents carefully before investing.
          </p>

          <p className="mt-3">
            Attention investors: 1 Stock brokers can accept securities as margins from clients only by way of pledge in the depository system w.e.f September 01, 2020. 2 Update your e-mail and phone number with your stock broker / depository participant and receive OTP directly from depository on your e-mail and/or mobile number to create pledge. 3 Check your securities / MF / bonds in the consolidated account statement issued by NSDL/CDSL every month.
          </p>

          <p className="mt-3">
            India's largest broker based on networth as per NSE. NSE broker factsheet
          </p>

          <p className="mt-3">
            "Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers. Receive information of your transactions directly from Exchange on your mobile/email at the end of the day. Issued in the interest of investors. KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary." Dear Investor, if you are subscribing to an IPO, there is no need to issue a cheque. Please write the Bank account number and sign the IPO application form to authorize your bank to make payment in case of allotment. In case of non allotment the funds will remain in your bank account. As a business we don't give stock tips, and have not authorized anyone to trade on behalf of others. If you find anyone claiming to be part of Zerodha and offering such services, please create a ticket here.
          </p>

          <p className="mt-3">
           *Customers availing insurance advisory services offered by Ditto (Tacterial Consulting Private Limited | IRDAI Registered Corporate Agent (Composite) License No CA0738) will not have access to the exchange investor grievance redressal forum, SEBI SCORES/ODR, or arbitration mechanism for such products.
          </p>
        </div>

        {/* BOTTOM LINKS */}
        <div className="flex flex-wrap gap-6 justify-center mt-10 text-xs opacity-80">
          <span className="hover:text-white cursor-pointer">NSE</span>
          <span className="hover:text-white cursor-pointer">BSE</span>
          <span className="hover:text-white cursor-pointer">Terms & Conditions</span>
          <span className="hover:text-white cursor-pointer">Policies</span>
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Disclosure</span>
        </div>

      </div>
    </div>
  );
};

export default Footer;
