import { useEffect } from "react";

export default ({ isLoading }) => {
  useEffect(() => {
    if (isLoading) {
      document.body.classList.add('loading');
    } else {
      document.body.classList.remove('loading');
    }
  }, [isLoading]);
  return (
    isLoading && <div className="dialog_main overlay fixed inset-0 z-20">
      <div className="dialog_size fixed inset-0 w-full h-full" style={{ backgroundColor: 'transparent' }}></div>
      <div className="dialog_position flex items-center justify-center min-h-screen px-5">
        <div className="loading-container">
          {/* <div class="loading-div"></div> */}
          {/* TRIPLE SPINNER  */}
          <div className="flexbox">
            <div>
              <div className="hm-spinner"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}