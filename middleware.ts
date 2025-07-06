
import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect admin routes
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
          return token?.role === "ADMIN"
        }
        
        // Protect private survey route (for authenticated users)
        if (req.nextUrl.pathname.startsWith("/encuesta") && !req.nextUrl.pathname.startsWith("/encuesta-publica")) {
          return !!token
        }
        
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*", "/encuesta/:path*"]
}
