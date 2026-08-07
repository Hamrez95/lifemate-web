import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><div className="brand"><span className="brand-mark"><i/><i/></span><strong>LifeMate</strong></div><span className="error-code">404</span><h1>این صفحه پیدا نشد · Page not found</h1><p>مسیر موردنظر در نسخه فعلی LifeMate وجود ندارد.</p><Link className="button button-primary" href="/fa">بازگشت به خانه</Link></main>;
}
