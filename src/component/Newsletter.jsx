import "./Newsletter.css";

function Newsletter() {
  return (
    <>
      <div className="news">
        <div className="news-text">
          <h2>Newsletter</h2>
          <form>
            <input type="email" placeholder="your@email.com" />
            <button type="submit" className="py-6 px-8 bg-red-500 text-white font-semibold">Subscribe</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Newsletter;
