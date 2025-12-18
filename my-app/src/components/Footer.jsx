import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <div className="container text-center">
        <small>
          &copy; {new Date().getFullYear()} Star Wars App. All rights reserved.
        </small>
      </div>
    </footer>
  )
}
