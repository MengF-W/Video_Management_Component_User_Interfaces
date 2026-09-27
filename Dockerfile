FROM node:alpine AS build
WORKDIR /video_management_component_user_interfaces/video-component-ang
COPY angular/video-component-ang/package.json angular/video-component-ang/package-lock.json ./
RUN npm install
COPY angular/video-component-ang/ /video_management_component_user_interfaces/video-component-ang
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /video_management_component_user_interfaces/video-component-ang/dist/video-component-ang /usr/share/nginx/html
EXPOSE 80