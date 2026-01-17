// import axios from "axios";

// export const publicApi = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   timeout: 15000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// publicApi.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // ⏱ Timeout
//     if (error.code === "ECONNABORTED") {
//       error.response = {
//         data: {
//           message: "Yêu cầu hết thời gian chờ. Vui lòng thử lại.",
//         },
//       };
//       return Promise.reject(error);
//     }

//     // 🌐 Network error
//     if (!error.response) {
//       error.response = {
//         data: {
//           message:
//             "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.",
//         },
//       };
//       return Promise.reject(error);
//     }

//     return Promise.reject(error);
//   }
// );
