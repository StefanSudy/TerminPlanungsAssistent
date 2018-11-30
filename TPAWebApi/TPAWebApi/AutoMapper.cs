using AutoMapper;
using BusinessLogic.Models;
using TPAWebApi.ModelsDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TPAWebApi
{
    public class AutoMapper
    {
        public static void Configure()
        {
            Mapper.Initialize(
                cfg => cfg
                    .CreateMap<UserDto, User>().ForMember(x => x.Id, opt => opt.Ignore())
            );
        }
    }
}
