import React from "react";

const AboutUs = () => {
  return (
    <div className="container mx-auto mt-8 p-8 text-justify w-5/6">
      <h2 className="text-5xl font-bold mb-6 text-red-700">
        About E-RakthKosh System
      </h2>
      <p className="text-xl mb-6">
        Welcome to E-RakthKosh System, a revolutionary platform dedicated to
        enhancing blood management and facilitating seamless blood donation
        processes. At E-RakthKosh, our mission is to bridge the gap between
        blood donors and recipients, ensuring a robust and efficient blood
        supply chain.
      </p>

      <h3 className="text-3xl font-bold mb-4 text-red-700">Our Vision</h3>
      <p className="text-xl mb-6">
        E-RakthKosh envisions a world where every individual has timely access
        to safe and compatible blood when needed. We aim to leverage technology
        to streamline blood donation processes, optimize inventory management,
        and ultimately save lives.
      </p>

      <h3 className="text-3xl font-bold mb-4 text-red-700">
        What Sets Us Apart
      </h3>
      <ul className="list-disc list-inside mb-4">
        <li className="text-xl">
          <strong>Innovative Technology:</strong> E-RakthKosh System
          incorporates cutting-edge technologies to simplify blood donation,
          collection, and distribution. Our user-friendly interface ensures a
          smooth and secure experience for both donors and healthcare providers.
        </li>
        <li className="text-xl">
          <strong>Comprehensive Blood Inventory Management:</strong> We
          understand the critical importance of maintaining a well-managed blood
          inventory. E-RakthKosh System employs sophisticated inventory
          management tools to track blood types, quantities, and expiration
          dates, ensuring a constant and reliable supply.
        </li>
        <li className="text-xl">
          <strong>Community Engagement:</strong> Beyond technology, we actively
          engage with communities to raise awareness about the significance of
          voluntary blood donation. Community drives, awareness campaigns, and
          educational initiatives are integral to our commitment to building a
          strong and altruistic donor community.
        </li>
      </ul>

      <h3 className="text-3xl font-bold mb-4 text-red-700">How It Works</h3>
      <ol className="list-decimal list-inside mb-6">
        <li className="text-xl">
          <strong>User-Friendly Donor Portal:</strong> Donors can easily
          register, schedule appointments, and track their donation history
          through our intuitive donor portal. Real-time notifications keep them
          informed about upcoming drives and urgent blood needs.
        </li>
        <li className="text-xl">
          <strong>Efficient Blood Distribution:</strong> Healthcare providers
          can rely on our system to access real-time blood inventory data,
          facilitating quick and efficient distribution to hospitals and
          clinics.
        </li>
        <li className="text-xl">
          <strong>Emergency Response:</strong> In times of crises or
          emergencies, E-RakthKosh System plays a vital role in coordinating
          immediate responses, mobilizing donors, and ensuring a timely supply
          of blood products.
        </li>
      </ol>

      <h3 className="text-3xl font-bold mb-4 text-red-700">
        Join Us in Saving Lives
      </h3>
      <p className="text-xl mb-6">
        Whether you are an individual looking to make a difference by donating
        blood or a healthcare professional seeking a reliable blood management
        solution, E-RakthKosh System welcomes you to join our mission. Together,
        we can make a meaningful impact on healthcare and contribute to a
        healthier and more resilient community.
      </p>

      <p className="text-xl">
        Thank you for being a part of E-RakthKosh System!
      </p>
    </div>
  );
};

export default AboutUs;
