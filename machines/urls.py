"""
URL configuration for machines project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import handler500
from django.urls import include, path, re_path
from django.http import HttpResponseNotFound
from machines.views import react_view
from machines.api.auth import check_auth, login_user, logout_user
from machines.api.machines import handlers

handler500 = 'machines.views.error_view'

urlpatterns = [
    # django admin
    path('admin/', admin.site.urls),
    
    # auth
    path('api/login/', login_user, name='login_user'),
    path('api/logout/', logout_user, name='logout_user'),
    path('api/check-auth/', check_auth, name='check_auth'),

    # machines
    path('api/machines/', handlers.machines_list, name='machines_list'),
    path('api/machines/<path:machine_id>/', handlers.machine_details, name='machine_details'),

    # undefined API 404
    path('api/<path:unmatched>', lambda request, unmatched: HttpResponseNotFound('API not found')),


    # rest of urls will be handled by react-router
    re_path('^.*$', react_view)
]
