import React from "react";

export default function Description() {
  return (
    <section className="w-full bg-[#0a0a0a] text-gray-200 py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <h2 className="text-3xl font-semibold mb-12">Charges explained</h2>

        {/* TWO COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* LEFT COLUMN */}
          <div className="space-y-10">

            {/* SECTION BLOCK */}
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Securities/Commodities transaction tax
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Tax by the government when transacting on the exchanges. Charged on both
                buy and sell sides when trading equity delivery. Charged only on selling
                side when trading intraday or F&O.
                <br /><br />
                When trading at Zerodha, STT/CTT can be a lot more than the brokerage we
                charge. Important to keep a tab.
              </p>
            </div>

            {/* TRANSACTION / TURNOVER CHARGES */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Transaction/Turnover Charges</h3>
              <p className="text-gray-400 leading-relaxed">
                Charged by exchanges (NSE, BSE, MCX) on the value of your transactions.
                <br /><br />
                BSE has revised transaction charges in XC, XD, XT, Z and ZP groups to ₹10,000
                per crore w.e.f 01.01.2016. (XC and XD groups merged into group X)
                <br /><br />
                BSE revised transaction charges in SS and ST groups to ₹1,00,000 per crore.
                <br /><br />
                For non-exclusive scrips (E, F, FC, G, GC, W, T): ₹375 per crore turnover.
                <br /><br />
                BSE revised charges in M, MT, TS, MS groups to ₹275 per crore.
              </p>
            </div>

            {/* CALL & TRADE */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Call & trade</h3>
              <p className="text-gray-400 leading-relaxed">
                Additional charges of ₹50 per order for dealer-placed orders including auto square off.
              </p>
            </div>

            {/* STAMP CHARGES */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Stamp charges</h3>
              <p className="text-gray-400 leading-relaxed">
                Charged by Government of India as per the Indian Stamp Act of 1899 for
                transacting on exchanges and depositories.
              </p>
            </div>

            {/* NRI BROKERAGE CHARGES */}
            <div>
              <h3 className="text-xl font-semibold mb-2">NRI brokerage charges</h3>
              <p className="text-gray-400 leading-relaxed">
                For non-PIS: 0.5% or ₹50 per executed order (lower).
                <br /><br />
                For PIS: 0.5% or ₹200 per executed order (lower).
                <br /><br />
                ₹500 + GST yearly AMC charges.
              </p>
            </div>

            {/* ACCOUNT WITH DEBIT BALANCE */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Account with debit balance</h3>
              <p className="text-gray-400 leading-relaxed">
                If account is in debit, orders cost ₹40/executed order instead of ₹20.
              </p>
            </div>
          </div>


          {/* RIGHT COLUMN */}
          <div className="space-y-10">

            {/* GST */}
            <div>
              <h3 className="text-xl font-semibold mb-2">GST</h3>
              <p className="text-gray-400 leading-relaxed">
                18% on (brokerage + SEBI charges + transaction charges)
              </p>
            </div>

            {/* SEBI CHARGES */}
            <div>
              <h3 className="text-xl font-semibold mb-2">SEBI Charges</h3>
              <p className="text-gray-400 leading-relaxed">
                ₹10 per crore + GST by SEBI for regulating markets.
              </p>
            </div>

            {/* DP CHARGES */}
            <div>
              <h3 className="text-xl font-semibold mb-2">DP (Depository participant) charges</h3>
              <p className="text-gray-400 leading-relaxed">
                ₹15.34 per scrip (CDSL + Zerodha + GST) when selling stocks.
                <br /><br />
                Female demat accounts get ₹0.25 discount on CDSL fee.
                <br /><br />
                Mutual funds & bonds get ₹0.25 discount on CDSL fee.
              </p>
            </div>

            {/* PLEDGING */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Pledging charges</h3>
              <p className="text-gray-400 leading-relaxed">
                ₹30 + GST per pledge request per ISIN.
              </p>
            </div>

            {/* AMC */}
            <div>
              <h3 className="text-xl font-semibold mb-2">AMC (Account Maintenance Charges)</h3>
              <p className="text-gray-400 leading-relaxed">
                BSDA: Zero charges if holdings &lt; ₹4,00,000.
                <br /><br />
                Non-BSDA: ₹300/year + 18% GST (charged quarterly).
              </p>
            </div>

            {/* CORPORATE ACTION */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Corporate action order charges</h3>
              <p className="text-gray-400 leading-relaxed">
                ₹20 + GST for OFS, buyback, takeover, delisting orders.
              </p>
            </div>

            {/* OFF-MARKET TRANSFER */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Off-market transfer charges</h3>
              <p className="text-gray-400 leading-relaxed">
                ₹25 per transaction.
              </p>
            </div>

            {/* PHYSICAL CMR */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Physical CMR request</h3>
              <p className="text-gray-400 leading-relaxed">
                First CMR free.
                <br />
                ₹20 + ₹100 courier + GST for additional requests.
              </p>
            </div>

            {/* PAYMENT GATEWAY */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Payment gateway charges</h3>
              <p className="text-gray-400 leading-relaxed">
                ₹9 + GST (UPI transfers excluded).
              </p>
            </div>

            {/* DELAYED PAYMENT */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Delayed Payment Charges</h3>
              <p className="text-gray-400 leading-relaxed">
                18% yearly or 0.05% per day on debit balance.
              </p>
            </div>

            {/* 3-in-1 BLOCKED ACCOUNT */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Trading using 3-in-1 account</h3>
              <p className="text-gray-400 leading-relaxed">
                Delivery & MTF: 0.5% per executed order.
                <br />
                Intraday: 0.05% per executed order.
              </p>
            </div>

          </div>
        </div>

        {/* DISCLAIMER */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <h3 className="text-xl font-semibold mb-2">Disclaimer</h3>
          <p className="text-gray-500 text-[15px] leading-relaxed">
            For delivery based trades, a minimum of ₹0.01 will be charged per contract note.
            Clients opting for physical notes will be charged ₹20 + courier fee. Brokerage does
            not exceed SEBI/exchange limits. All regulatory charges at actuals. Brokerage also
            charged on expired/exercised/assigned options. Free investment only for retail
            clients. Corporate accounts charged 0.1% or ₹20 (lower). Physically settled
            contracts brokerage 0.25% (or 0.1% for netted-off positions).
          </p>
        </div>

      </div>
    </section>
  );
}
