import HomePage from '@/components/HomePage.vue';
import { mount } from '@vue/test-utils';

describe('HomePage', ()=>{
  it('should render the title of the page',()=>{
      const wrapper = mount(HomePage); 
      expect(wrapper.text()).toContain('Encontre o PetShop com os melhores preços na sua região!');
  }),

  it('should disable the button when the form is invalid', async () => {
    const wrapper = mount(HomePage);
    await wrapper.setData({ form: { date: '', smallDogs: 0, bigDogs: 0 } });
    const button = wrapper.find('button');
    expect(button.element.disabled).toBe(true) 
  });

  it('should set the bestPetshop correctly based on form data', async () => {
    const wrapper = mount(HomePage);
    await wrapper.setData({ form: { date: '2024-02-03', smallDogs: 2, bigDogs: 1 } });
    await wrapper.vm.submitForm();
    expect(wrapper.find('.resultado').text()).toContain('Vai Rex');
    expect(wrapper.find('.resultado').text()).toContain('R$ 95');
  });
});