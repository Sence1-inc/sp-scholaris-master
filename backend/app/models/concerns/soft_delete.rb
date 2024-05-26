module SoftDelete    
    extend ActiveSupport::Concern

    module ClassMethods
        def is_soft_deleted(obj)
            !obj.deleted_at.present?
        end

        def soft_delete(obj)
            obj.update_attribute!('deleted_at', Time.now)
        end

        def restore(obj)
            obj.update(deleted_at:nil)
        end
    end
end