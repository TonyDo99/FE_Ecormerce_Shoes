import React from "react";
import { Link } from "react-router-dom";

function Item({ products }) {
  return (
    <>
      {products.length &&
        products.map((items, index) => (
          <article
            className="transition-transform duration-500 hover:-translate-y-3 md:w-auto xl:w-96 cursor-pointer h-full group-hover:opacity-75"
            key={index}
          >
            <div className="relative h-full">
              <img
                src={items.path}
                className="w-full h-full object-cover rounded-xl"
                alt="Restaurant"
              />
              <ul className="absolute list-none inline-flex top-3 left-5 text-xs text-white font-medium">
                <li
                  className={
                    (items.status === "Sale"
                      ? "bg-yellow-500"
                      : items.status === "New"
                      ? "bg-blue-500"
                      : "bg-pink_f5548e") +
                    " flex justify-center items-center w-16 h-6  mr-2"
                  }
                >
                  {items.status}
                </li>
              </ul>
              <a href="/#" className="absolute -bottom-3 right-10">
                <img
                  src={items.path}
                  className="object-cover rounded-full w-10 h-10"
                  alt="Small detail"
                />
              </a>
            </div>
          </article>
        ))}
    </>
  );
}

function ShoesComponent({ ...props }) {
  return (
    <div className="w-full md:w-1/2 lg:1/3 xl:w-1/4 md:h-max gap-y-5 px-5 sm:px-0">
      <Link to={`/categories/${props._id}`}>
        <article className="transition-transform duration-500 hover:-translate-y-3 cursor-pointer w-full sm:w-4/5 font-Public">
          <img
            className="h-[270px] object-cover rounded-t-xl w-max"
            src={props.url}
            alt="Nike Air Force 1 NDESTRUKT"
          />
          <div className="w-full py-6 border-b-2 drop-shadow-lg rounded-b-lg hover:text-gray_7a82a6 px-4 sm:px-1">
            <div className="flex justify-between items-center text-sm font-semibold text-bg_272b41 ">
              <span>{props.name}</span>
              <span>{props.quantity}</span>
            </div>
            <div className="flex justify-between items-center pt-3 font-semibold text-bg_272b41">
              <span className="text-sm">Màu</span>
              <span>${props.price}</span>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}

export { Item, ShoesComponent };
