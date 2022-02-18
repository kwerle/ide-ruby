PROJECT_NAME=ide-ruby
LOCAL_LINK=-v $(PWD):/tmp/src -w /tmp/src

build:
	docker build -t $(PROJECT_NAME) .

# guard: build
# 	echo > active_record.log
# 	docker run -it --rm $(LOCAL_LINK) -e LOG_LEVEL=DEBUG $(PROJECT_NAME) bundle exec guard
# 	echo > active_record.log
#
# continuous_development: build
# 	docker build -t local_ruby_language_server .
# 	echo "You are going to want to set the ide-ruby 'Image Name' to local_ruby_language_server"
# 	sleep 15
# 	while (true) ; \
# 	do \
# 	  docker build -t local_ruby_language_server . ; \
# 	  sleep 2 ; \
# 	done
#
# console: build
# 	docker run -it --rm $(LOCAL_LINK) $(PROJECT_NAME) bin/console
#
# test: build
# 	docker run -it --rm $(LOCAL_LINK) $(PROJECT_NAME) rake test && rubocop

shell: build
	docker run -it --rm $(LOCAL_LINK) $(PROJECT_NAME) sh


cross_platform_image:
	(docker buildx ls | grep mybuilder) || docker buildx create --name mybuilder
	docker buildx use mybuilder
	docker buildx build --platform linux/amd64,linux/arm64 -t $(PROJECT_NAME) .
