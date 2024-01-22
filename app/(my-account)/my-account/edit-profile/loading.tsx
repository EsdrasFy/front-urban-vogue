export default function Loading() {

  return (
    <section className="h-screen w-full flex items-start justify-center bg-custom-grayOne">
        <main
          role="status"
          className="animate-pulse max-w-[900px] w-full mx-8 bg-custom-grayOne flex  shadow-snipped relative h-fit  flex-col mt-36 mb-36"
        >
          <span
            className="absolute left-0 w-full h-24
       bg-custom-grayTwo dark:bg-custom-grayThree"
          ></span>
          
            <div className="flex w-full justify-center mt-8 pb-16 z-10">
              <figure className="w-[125px] h-[125px] rounded-full border-[6px]  bg-[#666] border-custom-grayOne dark:bg-[#666]"></figure>
            </div>
            <ul className="flex flex-col w-full px-20 gap-12 pb-6">

            <li
            className="w-full h-14 rounded-sm
            bg-custom-grayTwo dark:bg-custom-grayThree"
            ></li>
            <li
            className="w-full h-14 rounded-sm
            bg-custom-grayTwo dark:bg-custom-grayThree"
            ></li>
            <li
            className="w-full h-14 rounded-sm
            bg-custom-grayTwo dark:bg-custom-grayThree"
            ></li>
            <li
            className="w-full h-14 rounded-sm
            bg-custom-grayTwo dark:bg-custom-grayThree"
            ></li>
            <div className="flex w-full gap-12">
            <li
            className="w-full h-14 rounded-sm
            bg-custom-grayTwo dark:bg-custom-grayThree"
            ></li>
            <li
            className="w-full h-14 rounded-sm
            bg-custom-grayTwo dark:bg-custom-grayThree"
            ></li>
            </div>
            <div className="flex w-full gap-12">
            <li
            className="w-full h-14 rounded-sm
            bg-custom-grayTwo dark:bg-custom-grayThree"
            ></li>
            <li
            className="w-full h-14 rounded-sm
            bg-custom-grayTwo dark:bg-custom-grayThree"
            ></li>
            </div>
            <div className="flex w-full justify-end gap-5">
              <span className="rounded-sm w-28 h-12
            bg-custom-grayTwo dark:bg-custom-grayThree"></span>
              <span className="rounded-sm w-28 h-12
            bg-custom-grayTwo dark:bg-custom-grayThree"></span>
            </div>
            </ul>
        </main>
      </section>
  );
}
