// import "./MenuCard.css";

function MenuCard() {
  return (
    <>
      <h1>Hello There</h1>
    </>
    // <section className="menu-section">
    //   {/* Header */}
    //   <div className="menu-header">
    //     <div
    //       className={`icon-wrapper ${data.iconBgClass} ${data.iconColorClass}`}
    //     >
    //       <span
    //         className="material-symbols-outlined"
    //         style={{ fontSize: "32px" }}
    //       >
    //         {data.icon}
    //       </span>
    //     </div>
    //     <h2 className="menu-title">{data.title}</h2>
    //   </div>

    //   {/* Hero Image */}
    //   <div className="hero-container">
    //     <div className="hero-gradient"></div>
    //     <div className="hero-content">
    //       {heroItem.isBestSeller && (
    //         <span className="badge-best-seller">Best Seller</span>
    //       )}
    //       <h3>{heroItem.name}</h3>
    //       <p>{heroItem.description}</p>
    //     </div>
    //     <div
    //       className="hero-image"
    //       style={{ backgroundImage: `url("${data.heroImage}")` }}
    //       aria-label={heroItem.name}
    //     ></div>
    //   </div>

    //   {/* List Items */}
    //   <div className="items-list">
    //     {data.items.map((item) => (
    //       <div key={item.id} className="menu-item">
    //         <div style={{ flex: 1 }}>
    //           <div
    //             style={{
    //               display: "flex",
    //               alignItems: "center",
    //               gap: "0.5rem",
    //               flexWrap: "wrap",
    //             }}
    //           >
    //             <h4 className="item-name">{item.name}</h4>
    //             {item.isVegetarian && (
    //               <span
    //                 className="material-symbols-outlined"
    //                 style={{
    //                   color: "var(--secondary-green)",
    //                   fontSize: "18px",
    //                 }}
    //                 title="Vegetarian"
    //               >
    //                 eco
    //               </span>
    //             )}
    //             {item.isNew && <span className="badge-new">New</span>}
    //           </div>
    //           <p className="item-calories">{item.calories} cal</p>
    //           <p className="item-description">{item.description}</p>
    //         </div>
    //         <div>
    //           <span className="item-price">${item.price.toFixed(2)}</span>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </section>
  );
}

export default MenuCard;
