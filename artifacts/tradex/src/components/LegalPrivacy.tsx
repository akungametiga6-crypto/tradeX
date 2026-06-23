export default function LegalPrivacy() {
  return (
    <section className="py-24 bg-background border-t border-border/30" id="legal">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Legal & Privacy</h2>
          <p className="text-muted-foreground">Please read carefully before using tradexeasy.</p>
        </div>

        <div className="space-y-12 text-sm text-muted-foreground leading-relaxed prose prose-invert max-w-none">
          
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Terms of Service</h3>
            <p className="mb-4">
              tradexeasy provides informational data, charting tools, and routing interfaces only. We do not provide financial, investment, legal, or tax advice. Any trading decisions made using our platform are solely your responsibility.
            </p>
            <p>
              Users trade at their own risk. There is no guarantee of profits. The platform is provided "as is" without warranties of any kind. tradexeasy and its operators are not responsible for any financial losses, data inaccuracies, or execution failures incurred while using the service.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Privacy Policy</h3>
            <p className="mb-4">
              We respect your privacy. We collect usage data, public wallet addresses, and aggregated trade analytics to improve platform performance and route optimization.
            </p>
            <p>
              Data is encrypted in transit and at rest. We never sell your personal data to third parties. Our practices are GDPR compliant. Users may request full data deletion by contacting our support team.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Risk Disclosure</h3>
            <p className="mb-4">
              Crypto trading involves significant risk of loss and is not suitable for every investor. The valuation of cryptocurrencies may fluctuate, and as a result, clients may lose more than their original investment.
            </p>
            <p>
              Past performance is not indicative of future results. The highly leveraged nature of cryptocurrency trading means that small market movements will have a great impact on your trading account and this can work against you, leading to large losses or can work for you, leading to large gains. Only trade what you can afford to lose.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
