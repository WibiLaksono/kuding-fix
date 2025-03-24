"use link"

export default function Footer (){
    return (
        <footer className="bg-white py-10 mt-10 border-t">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-black mb-2">LOAZ</h4>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-black mb-2">Quick Links</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Products</li>
              <li>Categories</li>
              <li>About Us</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-black mb-2">Contact Us</h4>
            <p className="text-sm text-gray-600">123 Street, City, State</p>
            <p className="text-sm text-gray-600">Email: info@example.com</p>
            <p className="text-sm text-gray-600">Phone: (555) 123-4567</p>
          </div>
        </div>
      </footer>
    )
}