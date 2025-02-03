export default function PrivacyPolicy() {
    const lastUpdated = "2025-02-03"; // Update this date when changes are made
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-4">Last Updated: {lastUpdated}</p>
  
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Data Collection</h2>
          <ul className="list-disc pl-6">
            <li>We collect user and patient data to provide and improve our services.</li>
            <li>Data is stored securely and used in compliance with data protection regulations.</li>
          </ul>
        </section>
  
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Data Sharing</h2>
          <p>We do not share your data with third parties without your consent.</p>
        </section>
      </div>
    );
  }