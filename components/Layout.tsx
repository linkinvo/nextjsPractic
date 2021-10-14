import SiteHeader from "./SiteHeader";
import SearchFilters from "./SearchFilters";


export default function Layout({ props, children }) {
  return (
    <div className={"min-h-screen bg-gray-200 antialiased xl:flex xl:flex-col xl:h-screen xl:bg-gray-100"}>
      <SiteHeader props={props} />
      <div className="xl:flex xl:overflow-y-hidden">
        <SearchFilters />
        <main className="py-6 xl:flex-1 xl:overflow-y-scroll ">
          <div className="px-4">
            {/* <h3 className="text-gray-900 text-xl">Los Angeles</h3>
            <p className="text-gray-600">
              Live like the stars in these luxurious Southern California estates.
            </p> */}
          </div>
          <div className="mt-5 ">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}