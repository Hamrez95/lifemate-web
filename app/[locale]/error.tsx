"use client";

export default function ErrorState({ reset }: { reset: () => void }) {
  return <main className="not-found"><div className="brand"><span className="brand-mark"><i/><i/></span><strong>LifeMate</strong></div><span className="error-code">!</span><h1>مشکلی پیش آمد · Something went wrong</h1><p>می‌توانید دوباره تلاش کنید. اگر مشکل ادامه داشت، بعداً برگردید.</p><button className="button button-primary" type="button" onClick={reset}>تلاش دوباره · Try again</button></main>;
}
