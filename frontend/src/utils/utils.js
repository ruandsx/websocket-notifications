export const isMobile = () =>{
  return (
    window.navigator.userAgent.indexOf('Android')>-1 
    || 
    window.navigator.userAgent.indexOf('iPhone')>-1
  );
}
